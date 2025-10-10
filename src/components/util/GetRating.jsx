import React, { useState, useEffect } from 'react';
import { StarFilled, StarOutlined } from "@ant-design/icons";

const GetRating = ({ onSelect, readOnly, initialRating, color='#ffe234' }) => {
    const [rating, setRating] = useState(initialRating || null);
    const [hoveredRating, setHoveredRating] = useState(null);

    useEffect(() => {
        if (readOnly && initialRating) {
            onSelect(initialRating);
        }
    }, [readOnly, initialRating, onSelect]);

    const handleSelect = (value) => {
        if (!readOnly) {
            if (rating === value) {
                setRating(null);
            } else {
                setRating(value);
                onSelect(value);
            }
        }
    };

    const handleHover = (value) => {
        if (!readOnly) {
            setHoveredRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoveredRating(null);
        }
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    onClick={() => handleSelect(value)}
                    onMouseEnter={() => handleHover(value)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        cursor: readOnly ? 'default' : 'pointer',
                        color: (hoveredRating || rating) >= value ? color : 'lightgray',
                        fontSize: 'x-large',
                    }}
                >
                    {(hoveredRating || rating) >= value ?
                        <StarFilled /> : <StarOutlined />
                    }
                </span>
            ))}
        </div>
    );
};

export default GetRating;
