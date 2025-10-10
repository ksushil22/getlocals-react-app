import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from "react-redux";
import { useGetBusinessItemCategoriesQuery, useGetMenuItemsQuery } from "../../../redux/services/businessAPI";
import {
    StyledHeading,
    StyledInput,
    StyledLabel,
    StyledMenuContainer,
    StyledMenuHeaderContainer,
    StyledPanel,
    StyledTabs
} from "./StyledComponentsMenu";
import GetLoader, { DISPLAY, SPINNERS } from "../../util/customSpinner/GetLoader";
import "./style.css";
import { COLORS } from "../constants";
import ItemCard from "./MenuItemCard";
import OrderBar from "./OrderBar";

const MemoizedTabPanel = memo(({ category, businessId, currentCategories, handleTabChange, cart, setCart, setCount, count }) => {
    const isVisible = currentCategories.includes(category.id);

    const { data: menuItems, isLoading } = useGetMenuItemsQuery(
        { businessId, categoryId: category.id },
        { skip: !isVisible }
    );

    // Memoize label styles to prevent recreation
    const labelStyles = useMemo(() => ({
        top: 0,
        background: isVisible ? COLORS.PRIMARY_COLOR : '#e5e5e5',
        color: isVisible ? COLORS.PRIMARY_BACKGROUND : '#7f7f7f'
    }), [isVisible]);

    // Memoize panel class to prevent recreation
    const panelClass = useMemo(() => 
        `panel expandable ${isVisible ? "expanded" : ""}`, 
        [isVisible]
    );

    // Memoize menu items to prevent unnecessary re-renders
    const renderedMenuItems = useMemo(() => {
        if (!menuItems || isLoading) return null;
        
        return menuItems.map(data => (
            <ItemCard
                item={data}
                key={data.id}
                cart={cart}
                setCart={setCart}
                businessId={businessId}
                setCount={setCount}
                count={count}
            />
        ));
    }, [menuItems, isLoading, cart, setCart]);

    return (
        <React.Fragment>
            <StyledInput
                className="input"
                name="tabs"
                type="radio"
                id={`tab-${category.id}`}
                defaultChecked={false}
                onClick={() => handleTabChange(category.id)}
            />
            <StyledLabel
                className="label"
                style={labelStyles}
                htmlFor={`tab-${category.id}`}
            >
                {category.name}
                <div style={{ marginRight: 0 }}>{!isVisible ? "+" : "-"}</div>
            </StyledLabel>
            <StyledPanel className={panelClass}>
                {!menuItems || isLoading ? (
                    <GetLoader display={DISPLAY.AREA} spinner={SPINNERS.SKELETON_LIST} />
                ) : (
                    <div>
                        {renderedMenuItems}
                    </div>
                )}
            </StyledPanel>
        </React.Fragment>
    );
});

const Template1Menu = () => {
    const businessId = useSelector(state => state.templateBusiness.businessId);
    const [currentCategories, setCurrentCategories] = useState([]);
    const { data: categories, isLoading: loadingCategories } = useGetBusinessItemCategoriesQuery(businessId);
    const [cart, setCart] = useState({});
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Use requestAnimationFrame for smoother scrolling on low-end devices
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }, []);

    const handleTabChange = useCallback((id) => {
        setCurrentCategories(prevSelectedCategories =>
            prevSelectedCategories.includes(id)
                ? prevSelectedCategories.filter(categoryId => categoryId !== id)
                : [...prevSelectedCategories, id]
        );
    }, []);

    // Memoize cart total calculation to prevent unnecessary recalculations
    const cartTotal = useMemo(() => {
        return Object.entries(cart).reduce((total, [itemId, quantity]) => {
            // This would need item price data - simplified for now
            return total + quantity;
        }, 0);
    }, [cart]);

    // Memoize rendered categories to prevent unnecessary re-renders
    const renderedCategories = useMemo(() => {
        if (!categories) return null;
        
        return categories.map(category => (
            <MemoizedTabPanel
                key={category.id}
                category={category}
                currentCategories={currentCategories}
                handleTabChange={handleTabChange}
                businessId={businessId}
                cart={cart}
                setCart={setCart}
                setCount={setCount}
                count={count}
            />
        ));
    }, [categories, currentCategories, handleTabChange, businessId, cart, setCart]);

    return (
        <StyledMenuContainer>
            <StyledMenuHeaderContainer>
                <StyledHeading>Menu</StyledHeading>
            </StyledMenuHeaderContainer>
            {loadingCategories ? (
                <GetLoader spinner={SPINNERS.SKELETON_LIST_REVERSED} display={DISPLAY.AREA} />
            ) : (
                <>
                    <OrderBar count={count}/>
                    <StyledTabs>
                        {renderedCategories}
                    </StyledTabs>
                </>
            )}
        </StyledMenuContainer>
    );
};

export default Template1Menu;
