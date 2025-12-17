import React, { useState, useEffect, useRef } from 'react';
import { Image, Skeleton } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import { loadImageWithFallback } from '@/lib/utils/imageUtils';
import './PreviewableImage.css';

/**
 * Previewable Image Component
 * Shows thumbnail initially, loads full image only when preview is opened
 * 
 * Now accepts direct URLs instead of businessId/imageId (legacy endpoints removed)
 * 
 * @param {Object} props
 * @param {string} props.imageUrl - The full image URL (required)
 * @param {string} props.thumbnailUrl - The thumbnail URL (optional)
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - CSS class name
 * @param {Object} props.style - Inline styles
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {boolean} props.showLoader - Whether to show skeleton loader
 * @param {boolean} props.lazy - Enable lazy loading with IntersectionObserver
 * @param {boolean} props.showZoomHint - Show zoom icon on hover
 * @param {Function} props.onPreviewOpen - Callback when preview opens
 * @param {Function} props.onPreviewClose - Callback when preview closes
 */
const PreviewableImage = ({ 
    imageUrl,
    thumbnailUrl,
    alt = '', 
    className = '', 
    style = {},
    width,
    height,
    showLoader = true,
    lazy = true,
    showZoomHint = true,
    onPreviewOpen,
    onPreviewClose
}) => {
    const [displaySrc, setDisplaySrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isInView, setIsInView] = useState(!lazy);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);

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
                rootMargin: '50px'
            }
        );

        observerRef.current.observe(imgRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [lazy]);

    // Load thumbnail when in view
    useEffect(() => {
        if (!imageUrl || !isInView) return;

        const loadThumbnail = async () => {
            // Prefer thumbnail for display, fall back to full image
            const urlToLoad = thumbnailUrl || imageUrl;
            try {
                await loadImageWithFallback(urlToLoad);
                setDisplaySrc(urlToLoad);
                setIsLoading(false);
            } catch (err) {
                // If thumbnail fails, try full image
                if (thumbnailUrl && imageUrl) {
                    console.warn('Thumbnail not available, loading full image');
                    try {
                        await loadImageWithFallback(imageUrl);
                        setDisplaySrc(imageUrl);
                        setIsLoading(false);
                    } catch (fullErr) {
                        console.error('Failed to load image:', fullErr);
                        setError(true);
                        setIsLoading(false);
                    }
                } else {
                    console.error('Failed to load image:', err);
                    setError(true);
                    setIsLoading(false);
                }
            }
        };

        loadThumbnail();
    }, [imageUrl, thumbnailUrl, isInView]);

    // Handle preview
    const handlePreview = async () => {
        if (!previewSrc && imageUrl) {
            // Use full image for preview
            setPreviewSrc(imageUrl);
        }
        onPreviewOpen?.();
    };

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
                className={`previewable-image-error ${className}`}
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
            className={`previewable-image-container ${className}`}
            style={{ width, height, position: 'relative', ...style }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={displaySrc}
                alt={alt}
                width={'100%'}
                height={'100%'}
                style={{
                    objectFit: 'cover',
                    cursor: 'pointer'
                }}
                preview={{
                    src: previewSrc || imageUrl,
                    onVisibleChange: (visible) => {
                        if (visible) {
                            handlePreview();
                        } else {
                            onPreviewClose?.();
                        }
                    },
                    mask: showZoomHint ? (
                        <div className="preview-mask">
                            <ZoomInOutlined style={{ fontSize: '24px' }} />
                            <div style={{ marginTop: '8px', fontSize: '14px' }}>Click to view</div>
                        </div>
                    ) : null
                }}
            />
            {showZoomHint && isHovered && (
                <div className="zoom-hint-overlay">
                    <ZoomInOutlined />
                </div>
            )}
        </div>
    );
};

export default PreviewableImage;
