import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import {Button, Input} from "antd";
import {
    StyledMenuItemCard,
    StyledMenuItemInfoDiv,
    StyledMenuItemTitle,
    StyledMenuItemDescription,
    StyledMenuItemOrderDiv
} from "./StyledComponentsMenu";
import PreviewableImage from "../../util/PreviewableImage";

const ItemCard = memo(({ item, cart, setCart, businessId, setCount, count }) => {
    const cartItem = cart[item.id];
    const quantity = cartItem ? cartItem.count : 0;
    const [inputValue, setInputValue] = useState(quantity);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        let timeoutId;
        const throttledResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleResize, 100);
        };

        window.addEventListener("resize", throttledResize);
        return () => {
            window.removeEventListener("resize", throttledResize);
            clearTimeout(timeoutId);
        };
    }, [handleResize]);

    const updateQuantity = useCallback((delta) => {
        setCart((prev) => {
            const currentEntry = prev[item.id];
            const currentQty = currentEntry ? currentEntry.count : 0;
            const newQty = currentQty + delta;

            if (newQty <= 0) {
                const { [item.id]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [item.id]: { object: item, count: newQty }
            };
        });

        setCount((prev) => prev + delta);
    }, [item, setCart, setCount]);

    useEffect(() => {
        setInputValue(quantity);
    }, [quantity]);

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
                    style={{
                        width: "40px",
                        textAlign: "center",
                        border: "1px solid #ccc",
                        borderRadius: 4
                    }}
                />
            </div>
            <Button onClick={() => updateQuantity(1)}>+</Button>
        </div>
    ), [quantity, inputValue, handleInputChange, handleInputConfirm, updateQuantity]);

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

    const imageStyles = useMemo(() => ({
        objectFit: "cover",
        borderRadius: 2
    }), []);

    return (
        <StyledMenuItemCard style={{ position: "relative" }} key={item.id}>
            <div style={{ display: "flex", flex: 0.95, flexDirection: "row" }}>
                <div style={{ display: "flex", alignItems: "center", minWidth: 100 }}>
                    <PreviewableImage
                        businessId={businessId}
                        imageId={item.imageId}
                        alt={item.name}
                        width={100}
                        height={100}
                        style={imageStyles}
                        lazy={true}
                        showZoomHint={!isMobile}
                    />
                </div>

                <StyledMenuItemInfoDiv>
                    <div>
                        <StyledMenuItemTitle>{item.name}</StyledMenuItemTitle>
                        <span>{item.currency + item.price}</span>
                    </div>
                    <StyledMenuItemDescription>{item.description}</StyledMenuItemDescription>
                </StyledMenuItemInfoDiv>
            </div>

            {!isMobile && (
                <StyledMenuItemOrderDiv style={{ display: "flex", alignItems: "center", gap: 5, zIndex: 10 }}>
                    {QuantityButtons}
                </StyledMenuItemOrderDiv>
            )}

            {isMobile && (
                <div style={{ ...mobileOverlayStyles, zIndex: 20 }}>
                    {QuantityButtons}
                </div>
            )}
        </StyledMenuItemCard>
    );
});

export default ItemCard;
