import React, { useEffect, useState } from 'react';
import './style.css';

const texts = [" Marketing ", " Website Builder ", " Advertisement ", "Search Engine Optimization", "Social Media Marketing"];

const InformationDiv = () => {
    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let typingSpeed = 100;

        if (isDeleting) {
            typingSpeed = 50;
        }

        const typingInterval = setInterval(() => {
            if (!isDeleting) {
                // Typing characters
                setCurrentText((prev) => prev + texts[textIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                // Deleting characters
                setCurrentText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            }
        }, typingSpeed);

        if (!isDeleting && charIndex === texts[textIndex].length) {
            clearInterval(typingInterval);
            setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
        }

        if (isDeleting && charIndex === 0) {
            clearInterval(typingInterval);
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
        }

        return () => clearInterval(typingInterval);
    }, [charIndex, isDeleting, textIndex]);

    return (
        <div className="InformationDiv" style={{textAlign: 'right', flex: 1}}>
            <h1 className="typing-h1" style={{
                color: '#333',
            }}>{currentText}</h1>
            <p className={"animate__animated animate__slideInDown"}>One Subscription for all your Digital Business needs</p>
        </div>
    );
};

export default InformationDiv;
