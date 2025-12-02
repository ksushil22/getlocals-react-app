import React, { useEffect, useState } from 'react';
import './style.css';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { getImageUrl } from '../../../utils/imageUtils';

/**
 * Progressive Carousel Component
 * Displays carousel images at full resolution for best quality
 * 
 * @param {Array} images - Array of image objects with {id, name} properties
 * @param {string} businessId - Business ID for fetching images
 * @param {number} time - Auto-rotation time in milliseconds
 * @param {string} background - Background color
 * @param {Object} customStyle - Custom styles
 * @param {boolean} showIndicators - Show navigation indicators
 * @param {boolean} infiniteLoop - Enable infinite loop
 */
const ProgressiveCarousel = ({ 
    images = [], 
    businessId,
    time = 5000, 
    background = "#808080", 
    customStyle = {}, 
    showIndicators = true, 
    infiniteLoop = false 
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoRotationCompleted, setAutoRotationCompleted] = useState(false);
    
    const screens = useBreakpoint();
    const largeScreen = (screens.md || screens.lg || screens.xl || screens.xxl);

    useEffect(() => {
        if (!autoRotationCompleted && images.length > 1) {
            const timer = setTimeout(() => {
                goToNext();
            }, time);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, autoRotationCompleted, time, images.length]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        if (isLastSlide && !infiniteLoop) {
            setAutoRotationCompleted(true);
        }
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setAutoRotationCompleted(true); // Stop auto-rotation when user manually selects
    };

    if (!images || images.length === 0) {
        return (
            <div style={{
                background: background,
                width: '100%',
                height: largeScreen ? 'calc(100vh - 120px)' : '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...customStyle
            }}>
                <p style={{ color: '#999' }}>No images available</p>
            </div>
        );
    }

    return (
        <div style={{
            background: background,
            position: 'relative',
            border: '10px solid white',
            width: '100%',
            height: largeScreen ? 'calc(100vh - 120px)' : '80vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            ...customStyle
        }} className="carousel">
            <div
                className="carousel-inner"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                        key={image.id || index}
                    >
                        {businessId && image.id ? (
                            <img 
                                src={getImageUrl(businessId, image.id)}
                                alt={image.name || `Image ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                                loading="eager"
                            />
                        ) : (
                            // Fallback for legacy base64 images
                            <img 
                                src={image.url || image} 
                                alt={image.name || `Image ${index + 1}`} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            
            {showIndicators && images.length > 1 && (
                <>
                    <button className="prev" onClick={goToPrevious} aria-label="Previous image">
                        &#10094;
                    </button>
                    <button className="next" onClick={goToNext} aria-label="Next image">
                        &#10095;
                    </button>
                    <div className="indicators">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                role="button"
                                aria-label={`Go to image ${index + 1}`}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProgressiveCarousel;