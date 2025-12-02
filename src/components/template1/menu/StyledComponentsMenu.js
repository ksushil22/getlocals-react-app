import styled from "styled-components";
import {COLORS} from "../constants";

export const StyledMenuContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const StyledMenuHeaderContainer = styled.div`
    position: relative;
    width: 70%;
    text-align: center;
    margin: 20px 0;
    background: ${COLORS.PRIMARY_COLOR};
    color: rgba(245, 245, 245, 0.8);
    border-radius: 2px;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 2px;
        border: 1px solid rgba(245, 245, 245, 0.8);
    }

    @media (max-width: 992px) {
        width: 100%;
    }
`;

export const StyledHeading = styled.span`
    font-size: xx-large;
    font-weight: bolder;
`;

export const StyledTabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    justify-content: center;
    background: #e5e5e5;
    box-shadow: 0 48px 80px -32px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    flex-direction: column;

    @media (max-width: 992px) {
        width: 100%;
    }
`;

export const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
`;

export const StyledLabel = styled.label`
    width: 100%;
    height: 66px;
    padding: 20px 30px;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    transition: background-color 0.3s ease, color 0.3s ease; /* Reduced transition properties for better performance */
    border-color: #ccc;
    border-width: 1px 0;
    border-style: solid;
    display: flex;
    justify-content: space-between;
    will-change: background-color, color; /* Optimize for animations */

    @media (hover: hover) {
        &:hover {
            background: ${COLORS.PRIMARY_COLOR} !important;
            color: ${COLORS.PRIMARY_BACKGROUND}!important;
        }
    }

    @media (max-width: 992px) {
        border-width: 1px 0;
        padding: 15px 20px; /* Reduced padding for mobile */
        height: 56px; /* Reduced height for mobile */
    }
`;

export const StyledPanel = styled.div`
    background: #fff;
    width: 100%;
    contain: layout style paint; /* Optimize rendering performance */

    &::-webkit-scrollbar {
        width: 5px; /* Reduced width for better mobile experience */
    }

    &::-webkit-scrollbar-track {
        border-radius: 2px;
        background-color: #e7e7e7;
        border: none;
        box-shadow: inset 0 0 6px rgba(202, 202, 202, 0.3);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: #363636;
    }

    @media (max-width: 768px) {
        &::-webkit-scrollbar {
            width: 4px; /* Even thinner scrollbar on mobile */
        }
    }
`;

export const StyledMenuItemCard = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    padding: 3px 15px;
    border-radius: 2px;
    background-color: ${COLORS.PRIMARY_BACKGROUND};
    transition: box-shadow 0.3s ease, padding 0.2s ease; /* Reduced transition duration for better performance */
    will-change: box-shadow, padding; /* Optimize for animations */
    contain: layout style; /* Optimize rendering performance */
    
    @media (hover: hover) {
        &:hover {
            box-shadow: 0 24px 40px -16px rgba(0, 0, 0, 0.2); /* Reduced shadow intensity for better performance */
            padding: 6px 18px; /* Reduced padding change for smoother animation */
        }
    }

    @media (max-width: 768px) {
        margin: 8px 0; /* Reduced margin on mobile */
        padding: 2px 10px; /* Reduced padding on mobile */
    }
`

export const StyledMenuItemInfoDiv = styled.div`
    padding: 0 0 0 10px;
`

export const StyledMenuItemTitle = styled.p`
    font-weight: bold;
    font-size: large;
    margin: 0;
`

export const StyledMenuItemDescription = styled.p`
    color: #a1a1a1; 
`
export const StyledMenuItemOrderDiv = styled.div`
    flex: 0.05;
    align-content: center;
`
