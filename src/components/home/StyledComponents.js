import styled from "styled-components";

const screenSize = screen.width;

export const NavigatorDiv = styled.div`
    position: fixed;
    backdrop-filter: blur(10px);
    top: 0;
    left: 0;
    right: 0;
    max-width: 50%;
    margin: 10px auto;
    border-radius: 2px;
    min-height: 50px;
    background: rgba(97, 64, 68, 0.85);
    color: var(--primary-background);
    display: flex;
    align-items: center;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    z-index: 1000;
    justify-content: space-between;
    transition: transform 0.1s linear; /* Quick transition to make it smooth but responsive */
    animation: fadeInDown;
    animation-duration: 1s;

    @media (max-width: 1200px) {
        max-width: 100%;
    }
`;


export const MarketingInformationDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto 10px;
    flex-wrap: wrap-reverse;

    & > div:nth-child(2) img {
        object-fit: contain; /* Ensures the image fits within its container */
        max-width: 100%; /* Prevents the image from exceeding the container's width */
        display: block; /* Ensures the image is treated as a block-level element */
    }

    @media (max-width: 992px) {
        flex-direction: column-reverse;

        & > div {
            max-width: 100%;
        }
        
        & > div:nth-child(2) img {
            object-fit: contain; /* Ensures the image fits within its container */
            max-width: 100% !important; /* Prevents the image from exceeding the container's width */
            display: block; /* Ensures the image is treated as a block-level element */
        }
        
        & > div:nth-child(1) {
            text-align: center !important;
        }
    }
`;

export const BlockHeading = styled.h1`
    font-size: 3rem;
    text-align: center;
    text-decoration: underline;
    animation: zoomIn;
    animation-duration: 1s;
`

export const ListItemContainer = styled.div`
    width: 300px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    color: #333;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #fff;
    align-items: center;
    transition: padding 0.6s ease-in-out;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);    
    margin: 10px 20px;
`;

export const ListItemImage = styled.img`
    height: 250px;
    object-fit: contain;
    width: 100%;
`;

export const ListItemInfo = styled.div`
    margin-top: 20px;
    text-align: center;
    flex-grow: 1; /* Ensures this section fills the available vertical space */
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Align text towards the bottom */
`;

export const CenteredHalfDiv = styled.div`
    background: white;
    max-width: 992px;
    margin: auto;
    padding-left: 10px;
    padding-right: 10px;
`

export const TakeYourBusinessDiv = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: row-reverse;
    @media (max-width: 1298px) {
        flex-direction: column;
    }
`

export const TakeYourBusinessHeadingDiv = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @media (max-width: 1298px) {
        text-align: center;
    }
`

export const VisualsDiv = styled.div`
    flex: 0.7;
    display: flex;
    justify-content: center;
`

export const FooterDiv = styled.div`
    width: 100%;
    background: var(--primary-background);
`