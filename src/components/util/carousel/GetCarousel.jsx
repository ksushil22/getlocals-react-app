import React, { useEffect, useState } from 'react';
import './style.css';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const GetCarousel = ({ images, time = 5000, background = "#808080", customStyle= {}, showIndicators=true, infiniteLoop=false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoRotationCompleted, setAutoRotationCompleted] = useState(false);

    const screens = useBreakpoint();
    const largeScreen = (screens.md || screens.lg || screens.xl || screens.xxl);

    useEffect(() => {
        if (!autoRotationCompleted) {
            const timer = setTimeout(() => {
                goToNext();
            }, time);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, autoRotationCompleted, time]);

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
        setCurrentIndex(newIndex)
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

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
                        key={index}
                    >
                        <img src={image.url} alt={image.name} />
                    </div>
                ))}
            </div>
            {
                showIndicators && (
                    <>
                        <button className="prev" onClick={goToPrevious}>
                            &#10094;
                        </button>
                        <button className="next" onClick={goToNext}>
                            &#10095;
                        </button>
                        <div className="indicators">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                ></span>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default GetCarousel;
