import imageCompression from 'browser-image-compression';
import { shouldGenerateThumbnail } from '@/lib/constants/imageTypes';
import { businessAPI } from '@/lib/redux/services/businessAPI';
import { initializeStore } from '@/lib/redux/store';

/**
 * Image optimization settings per the migration doc
 */
const ORIGINAL_IMAGE_OPTIONS = {
    maxSizeMB: 0.7,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg'
};

const THUMBNAIL_IMAGE_OPTIONS = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 400,
    useWebWorker: true,
    fileType: 'image/jpeg'
};

/**
 * Optimize the original image
 * @param {File} file - The original file
 * @returns {Promise<Blob>} Optimized image blob
 */
export async function optimizeOriginalImage(file) {
    return await imageCompression(file, ORIGINAL_IMAGE_OPTIONS);
}

/**
 * Generate an optimized thumbnail
 * @param {File} file - The original file
 * @returns {Promise<Blob>} Thumbnail blob
 */
export async function generateThumbnail(file) {
    return await imageCompression(file, THUMBNAIL_IMAGE_OPTIONS);
}

/**
 * Initialize upload - get signed URLs from backend using Redux
 * @param {string} businessId 
 * @param {string} type - Image type (MENU, LOGO, CAROUSEL, EMPLOYEE)
 * @param {string} contentType - MIME type
 * @param {string} filename - Original filename
 * @param {boolean} generateThumbnailFlag - Whether to generate thumbnail
 * @returns {Promise<Object>} Upload init response
 */
async function initializeUpload(businessId, type, contentType, filename, generateThumbnailFlag) {
    const store = initializeStore();
    
    const result = await store.dispatch(
        businessAPI.endpoints.initializeImageUpload.initiate({
            businessId,
            type,
            contentType,
            filename,
            generateThumbnail: generateThumbnailFlag
        })
    );
    
    if (result.error) {
        throw new Error(`Failed to initialize upload: ${result.error.data || result.error.message}`);
    }
    
    return result.data;
}

/**
 * Upload blob to Supabase signed URL (NO Authorization header!)
 * This must remain as direct fetch - Supabase signed URLs don't use our backend auth
 * @param {string} signedUrl - The signed upload URL
 * @param {Blob} blob - The image blob to upload
 * @param {string} contentType - MIME type
 * @param {Function} onProgress - Progress callback (0-100)
 * @returns {Promise<void>}
 */
async function uploadToSupabase(signedUrl, blob, contentType, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgress) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                onProgress(percentComplete);
            }
        });
        
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
            } else {
                reject(new Error(`Supabase upload failed with status ${xhr.status}: ${xhr.responseText}`));
            }
        });
        
        xhr.addEventListener('error', () => {
            reject(new Error('Network error during Supabase upload'));
        });
        
        xhr.addEventListener('abort', () => {
            reject(new Error('Upload aborted'));
        });
        
        xhr.open('PUT', signedUrl);
        xhr.setRequestHeader('Content-Type', contentType);
        // NOTE: Do NOT set Authorization header for Supabase signed URL uploads
        xhr.send(blob);
    });
}

/**
 * Confirm upload with backend using Redux
 * @param {string} businessId 
 * @param {string} imageId 
 * @returns {Promise<Object>}
 */
async function confirmUpload(businessId, imageId) {
    const store = initializeStore();
    
    const result = await store.dispatch(
        businessAPI.endpoints.confirmImageUpload.initiate({
            businessId,
            imageId
        })
    );
    
    if (result.error) {
        throw new Error(`Failed to confirm upload: ${result.error.data || result.error.message}`);
    }
    
    return result.data;
}

/**
 * Upload a business image using the new signed-URL flow
 * 
 * Flow:
 * 1. Optimize original image (and thumbnail if needed)
 * 2. POST to backend to get signed URLs (via Redux)
 * 3. PUT original to Supabase (direct - no auth header)
 * 4. PUT thumbnail to Supabase (direct - no auth header)
 * 5. POST confirm to backend (via Redux)
 * 
 * @param {Object} options
 * @param {string} options.businessId - The business ID
 * @param {string} options.type - Image type (MENU, LOGO, CAROUSEL, EMPLOYEE)
 * @param {File} options.file - The file to upload
 * @param {boolean} [options.generateThumbnailOverride] - Override default thumbnail generation
 * @param {Function} [options.onProgress] - Progress callback (0-100)
 * @returns {Promise<{imageId: string, imageUrl: string, thumbnailUrl: string|null}>}
 */
export async function uploadBusinessImage({
    businessId,
    type,
    file,
    generateThumbnailOverride = null,
    onProgress
}) {
    // Determine whether to generate thumbnail
    const shouldGenThumbnail = generateThumbnailOverride !== null 
        ? generateThumbnailOverride 
        : shouldGenerateThumbnail(type);

    // Step 1: Optimize images
    if (onProgress) onProgress(5);
    
    const optimizedOriginal = await optimizeOriginalImage(file);
    
    let thumbnailBlob = null;
    if (shouldGenThumbnail) {
        thumbnailBlob = await generateThumbnail(file);
    }
    
    if (onProgress) onProgress(20);

    // Step 2: Get signed URLs from backend (via Redux)
    const initResponse = await initializeUpload(
        businessId,
        type,
        file.type || 'image/jpeg',
        file.name,
        shouldGenThumbnail
    );
    
    if (onProgress) onProgress(30);

    const {
        imageId,
        imageSignedUploadUrl,
        imagePublicUrl,
        thumbnailSignedUploadUrl,
        thumbnailPublicUrl,
        hasThumbnail
    } = initResponse;

    // Step 3: Upload original to Supabase (direct PUT - no auth header)
    await uploadToSupabase(
        imageSignedUploadUrl,
        optimizedOriginal,
        file.type || 'image/jpeg',
        (percent) => {
            // Original upload is 30-60% of total progress
            if (onProgress) onProgress(30 + Math.round(percent * 0.3));
        }
    );

    // Step 4: Upload thumbnail to Supabase (if applicable)
    if (hasThumbnail && thumbnailSignedUploadUrl && thumbnailBlob) {
        await uploadToSupabase(
            thumbnailSignedUploadUrl,
            thumbnailBlob,
            file.type || 'image/jpeg',
            (percent) => {
                // Thumbnail upload is 60-80% of total progress
                if (onProgress) onProgress(60 + Math.round(percent * 0.2));
            }
        );
    } else {
        if (onProgress) onProgress(80);
    }

    // Step 5: Confirm upload with backend (via Redux)
    await confirmUpload(businessId, imageId);
    
    if (onProgress) onProgress(100);

    return {
        imageId,
        imageUrl: imagePublicUrl,
        thumbnailUrl: hasThumbnail ? thumbnailPublicUrl : null
    };
}

/**
 * Calculate compression stats for UI feedback
 * @param {File} originalFile 
 * @param {Blob} optimizedBlob 
 * @returns {{originalSize: number, optimizedSize: number, compressionRatio: number, savedBytes: number}}
 */
export function getCompressionStats(originalFile, optimizedBlob) {
    const originalSize = originalFile.size;
    const optimizedSize = optimizedBlob.size;
    const savedBytes = originalSize - optimizedSize;
    const compressionRatio = originalSize > 0 ? ((savedBytes / originalSize) * 100) : 0;
    
    return {
        originalSize,
        optimizedSize,
        compressionRatio,
        savedBytes
    };
}

export default uploadBusinessImage;
