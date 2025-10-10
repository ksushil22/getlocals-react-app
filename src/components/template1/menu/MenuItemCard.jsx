import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import {Button, Image, Input} from "antd";
import {
    StyledMenuItemCard,
    StyledMenuItemInfoDiv,
    StyledMenuItemTitle,
    StyledMenuItemDescription,
    StyledMenuItemOrderDiv
} from "./StyledComponentsMenu";
import {getImageUrl} from "../../util/Commons";

const ItemCard = memo(({ item, cart, setCart, businessId, setCount, count }) => {
    const [inputValue, setInputValue] = useState(cart[item.id] || 0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    let imageUrl = getImageUrl(businessId, item.imageId);
    const quantity = cart[item.id] || 0;

    // Throttled resize handler for better performance on low-end devices
    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    // Handle screen resize for responsive rendering with throttling
    useEffect(() => {
        let timeoutId;
        const throttledResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleResize, 100); // Throttle to 100ms
        };

        window.addEventListener("resize", throttledResize);
        return () => {
            window.removeEventListener("resize", throttledResize);
            clearTimeout(timeoutId);
        };
    }, [handleResize]);

    // Memoize updateQuantity to prevent recreation
    const updateQuantity = useCallback((delta) => {
        setCart(prev => {
            const currentQty = prev[item.id] || 0;
            const newQty = currentQty + delta;
            if (newQty <= 0) {
                const { [item.id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [item.id]: newQty };
        });
        setCount(prev => prev+delta);
    }, [item.id, setCart]);

    // Keep input in sync
    useEffect(() => {
        setInputValue(quantity);
    }, [quantity]);

    // Memoize input handlers
    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const handleInputConfirm = useCallback(() => {
        const newQuantity = parseInt(inputValue, 10);
        if (!isNaN(newQuantity)) {
            updateQuantity(newQuantity - quantity);
        } else {
            setInputValue(quantity);
        }
    }, [inputValue, quantity, updateQuantity]);

    // Memoize quantity buttons to prevent recreation
    const QuantityButtons = useMemo(() => (
        <div className="quantity-container">
            <div className={`quantity-slide ${quantity > 0 ? "show" : ""}`}>
                <Button onClick={() => updateQuantity(-1)}>-</Button>
                <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onKeyDown={(e) => e.key === "Enter" && handleInputConfirm()}
                    onFocus={(e) => e.target.select()}
                    style={{ width: "40px", textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }}
                />
            </div>
            <Button onClick={() => updateQuantity(1)}>+</Button>
        </div>
    ), [quantity, inputValue, handleInputChange, handleInputConfirm, updateQuantity]);

    // Memoize mobile overlay styles to prevent recreation
    const mobileOverlayStyles = useMemo(() => ({
        position: "absolute",
        top: 5,
        right: 5,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 5,
        borderRadius: 6,
        padding: 2,
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
    }), []);

    // Memoize image styles to prevent recreation
    const imageStyles = useMemo(() => ({
        objectFit: "cover",
        borderRadius: 2
    }), []);

    return (
        <StyledMenuItemCard style={{ position: "relative" }} key={item.id}>
            {/* Card content */}
            <div style={{ display: "flex", flex: 0.95, flexDirection: "row" }}>
                <div style={{ display: "flex", alignItems: "center", minWidth: 100 }}>
                    <img
                        loading="lazy"
                        width={100}
                        height={100}
                        style={imageStyles}
                        src={imageUrl}
                        alt={item.name}/>
                </div>

                <StyledMenuItemInfoDiv>
                    <div>
                        <StyledMenuItemTitle>{item.name}</StyledMenuItemTitle>
                        <span>{item.currency + item.price}</span>
                    </div>
                    <StyledMenuItemDescription>{item.description}</StyledMenuItemDescription>
                </StyledMenuItemInfoDiv>
            </div>

            {/* Desktop order section */}
            {!isMobile && (
                <StyledMenuItemOrderDiv style={{ display: "flex", alignItems: "center", gap: 5, zIndex: 10 }}>
                    {QuantityButtons}
                </StyledMenuItemOrderDiv>
            )}

            {/* Mobile order section */}
            {isMobile && (
                <div style={{...mobileOverlayStyles, zIndex: 20}}>
                    {QuantityButtons}
                </div>
            )}
        </StyledMenuItemCard>
    );
});

export default ItemCard;
