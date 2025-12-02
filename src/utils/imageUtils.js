import { PUBLIC_BUSINESS_API } from '../redux/api_url';

/**
 * Get the base64 representation of a file
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64 string
 */
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

/**
 * Format bytes to human readable format
 * @param {number} bytes - The byte value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string like "1.5 MB"
 */
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Get the URL for a thumbnail image
 * @param {string} businessId - The business ID
 * @param {string} imageId - The image ID
 * @returns {string} The thumbnail URL
 */
export const getThumbnailUrl = (businessId, imageId) => {
    const BASE_URL = process.env.BASE_API_URL;
    return `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${imageId}/thumbnail/`;
};

/**
 * Get all thumbnails URL for a business
 * @param {string} businessId - The business ID
 * @returns {string} The thumbnails URL
 */
export const getAllThumbnailsUrl = (businessId) => {
    const BASE_URL = process.env.BASE_API_URL;
    return `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/thumbnails/`;
};

/**
 * Get the standard image URL
 * @param {string} businessId - The business ID
 * @param {string} imageId - The image ID
 * @returns {string} The image URL
 */
export const getImageUrl = (businessId, imageId) => {
    const BASE_URL = process.env.BASE_API_URL;
    return `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${imageId}/`;
};

/**
 * Get optimized image URL - returns thumbnail or full image based on preference
 * @param {string} businessId - The business ID
 * @param {string} imageId - The image ID
 * @param {boolean} useThumbnail - Whether to use thumbnail
 * @returns {string} The appropriate image URL
 */
export const getOptimizedImageUrl = (businessId, imageId, useThumbnail = false) => {
    return useThumbnail ? getThumbnailUrl(businessId, imageId) : getImageUrl(businessId, imageId);
};

/**
 * Check if device/network should use thumbnails only
 * @returns {boolean} Whether to use thumbnails only
 */
export const shouldUseThumbnailOnly = () => {
    // Check network connection if available
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        // Use thumbnails on data saver mode
        if (connection.saveData) return true;
        
        // Use thumbnails on slow connections
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') return true;
        
        // On 3G, check if mobile
        if (connection.effectiveType === '3g') {
            const isMobile = window.innerWidth <= 768;
            return isMobile;
        }
    }
    
    // Check device characteristics
    const isMobile = window.innerWidth <= 768;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    
    // Use thumbnails on mobile devices or low-end devices
    return isMobile || isLowEndDevice || isLowMemory;
};

/**
 * Get detailed information about why thumbnail-only mode was chosen
 * Useful for debugging and analytics
 * @returns {Object} Decision details
 */
export const getThumbnailDecisionInfo = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isMobile = window.innerWidth <= 768;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    
    const info = {
        decision: shouldUseThumbnailOnly(),
        reasons: [],
        deviceInfo: {
            isMobile,
            screenWidth: window.innerWidth,
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
            deviceMemory: navigator.deviceMemory || 'unknown'
        }
    };
    
    if (connection) {
        info.networkInfo = {
            effectiveType: connection.effectiveType || 'unknown',
            saveData: connection.saveData || false,
            downlink: connection.downlink || 'unknown',
            rtt: connection.rtt || 'unknown'
        };
        
        if (connection.saveData) info.reasons.push('Data saver mode enabled');
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
            info.reasons.push(`Slow connection: ${connection.effectiveType}`);
        }
        if (connection.effectiveType === '3g' && isMobile) {
            info.reasons.push('3G connection on mobile device');
        }
    }
    
    if (isMobile) info.reasons.push('Mobile device detected');
    if (isLowEndDevice) info.reasons.push('Low-end device (<=4 CPU cores)');
    if (isLowMemory) info.reasons.push('Low memory device (<=4GB)');
    
    if (info.reasons.length === 0) {
        info.reasons.push('Good conditions - full images will be loaded');
    }
    
    return info;
};

/**
 * Load image with error handling and fallback
 * @param {string} url - The image URL to load
 * @param {string} fallbackUrl - Fallback URL if primary fails
 * @returns {Promise<string>} The successful URL
 */
export const loadImageWithFallback = async (url, fallbackUrl = null) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => resolve(url);
        
        img.onerror = () => {
            if (fallbackUrl) {
                const fallbackImg = new Image();
                fallbackImg.onload = () => resolve(fallbackUrl);
                fallbackImg.onerror = () => reject(new Error('Both primary and fallback images failed to load'));
                fallbackImg.src = fallbackUrl;
            } else {
                reject(new Error('Image failed to load'));
            }
        };
        
        img.src = url;
    });
};