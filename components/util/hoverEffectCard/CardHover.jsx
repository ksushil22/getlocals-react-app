import React from "react";
import './style.css';
const CardHover = ({ title, spanText, text, linkText, linkUrl, extraText, discountText, imgSrc }) => {
    return (
        <div className="card-hover">
            <div className="card-hover__content">
                <h3 className="card-hover__title">
                    {title} <span>{spanText}</span>
                </h3>
                <p className="card-hover__text">{text}</p>
                <a href={linkUrl} className="card-hover__link">
                    <span>{linkText}</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </a>
            </div>
            <div className="card-hover__extra">
                <h4>{extraText} <span>{discountText}</span></h4>
            </div>
            <img src={imgSrc} alt="Card background" />
        </div>
    );
};

export default CardHover;
