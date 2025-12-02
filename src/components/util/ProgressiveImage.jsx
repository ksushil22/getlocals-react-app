import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from 'antd';
import { getThumbnailUrl, getImageUrl, loadImageWithFallback, shouldUseThumbnailOnly } from '../../utils/imageUtils';
import './ProgressiveImage.css';

/**
 * Progressive Image Component
 * Loads thumbnail first, then progressively loads the full image
 * 
 * @param {Object} props
 * @param {string} props.businessId - The business ID
 * @param {string} props.imageId - The image ID
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - CSS class name
 * @param {Object} props.style - Inline styles
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {boolean} props.showLoader - Whether to show skeleton loader
 * @param {boolean} props.useThumbnailOnly - Force thumbnail only (no progressive loading)
 * @param {boolean} props.autoLoadFull - Automatically load full image after thumbnail (default: true)
 * @param {Function} props.onLoad - Callback when image loads
 * @param {Function} props.onError - Callback when image fails to load
 * @param {boolean} props.lazy - Enable lazy loading with IntersectionObserver
 */
const ProgressiveImage = ({ 
    businessId, 
    imageId, 
    alt = '', 
    className = '', 
    style = {},
    width,
    height,
    showLoader = true,
    useThumbnailOnly = false,
    autoLoadFull = true,
    onLoad,
    onError,
    lazy = true
}) => {
    const [currentSrc, setCurrentSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFull, setIsLoadingFull] = useState(false);
    const [error, setError] = useState(false);
    const [isInView, setIsInView] = useState(!lazy);
    const imgRef = useRef(null);
    const observerRef = useRef(null);
    
    // Determine if we should only use thumbnails based on network/device
    const autoUseThumbnailOnly = useThumbnailOnly !== undefined ? useThumbnailOnly : shouldUseThumbnailOnly();

    // Set up IntersectionObserver for lazy loading
    useEffect(() => {
        if (!lazy || !imgRef.current) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observerRef.current?.disconnect();
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '50px' // Start loading 50px before entering viewport
            }
        );

        observerRef.current.observe(imgRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [lazy]);

    // Load images when in view
    useEffect(() => {
        if (!businessId || !imageId || !isInView) return;

        const loadImages = async () => {
            try {
                const thumbnailUrl = getThumbnailUrl(businessId, imageId);
                const fullUrl = getImageUrl(businessId, imageId);

                if (autoUseThumbnailOnly || !autoLoadFull) {
                    // Load only thumbnail
                    await loadImageWithFallback(thumbnailUrl);
                    setCurrentSrc(thumbnailUrl);
                    setIsLoading(false);
                    onLoad?.();
                } else {
                    // Try to load thumbnail first
                    try {
                        await loadImageWithFallback(thumbnailUrl);
                        setCurrentSrc(thumbnailUrl);
                        setIsLoading(false);
                        setIsLoadingFull(true);
                    } catch (thumbError) {
                        // If thumbnail fails, skip directly to full image
                        console.warn('Thumbnail not available, loading full image directly');
                        setIsLoadingFull(true);
                    }

                    // Load full image
                    try {
                        await loadImageWithFallback(fullUrl);
                        setCurrentSrc(fullUrl);
                        setIsLoadingFull(false);
                        onLoad?.();
                    } catch (fullError) {
                        // If full image also fails, keep thumbnail if available
                        if (!currentSrc) {
                            throw fullError;
                        }
                        setIsLoadingFull(false);
                        console.warn('Full image failed to load, keeping thumbnail');
                    }
                }
            } catch (err) {
                console.error('Failed to load image:', err);
                setError(true);
                setIsLoading(false);
                setIsLoadingFull(false);
                onError?.(err);
            }
        };

        loadImages();
    }, [businessId, imageId, isInView, autoUseThumbnailOnly, autoLoadFull, onLoad, onError]);

    // Show skeleton loader
    if (isLoading && showLoader) {
        return (
            <div ref={imgRef} style={{ width, height, ...style }} className={className}>
                <Skeleton.Image style={{ width: '100%', height: '100%' }} active />
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div 
                ref={imgRef}
                className={`progressive-image-error ${className}`}
                style={{ width, height, ...style }}
            >
                <div className="error-content">
                    <span>Failed to load image</span>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={imgRef}
            className={`progressive-image-container ${className}`}
            style={{ width, height, position: 'relative', ...style }}
        >
            {currentSrc && (
                <img
                    src={currentSrc}
                    alt={alt}
                    className={`progressive-image ${isLoadingFull ? 'loading-full' : ''}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            )}
            {isLoadingFull && (
                <div className="loading-overlay">
                    <div className="loading-spinner" />
                </div>
            )}
        </div>
    );
};

export default ProgressiveImage;