import styled from "styled-components";
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";

export const COLORS = {
    PRIMARY: '#b8b8b8',
    PRIMARY_BACKGROUND: '#F5F5F5',
    PRIMARY_COLOR: '#2b2b2b'
}

export const StyledLayout = styled(Layout)`  
    font-family: 'Montserrat', sans-serif !important;
`;

export const StyledContent = styled(Content)`  
    font-family: 'Montserrat', sans-serif !important;
`;

export const StyledFooter = styled(Footer)`
    font-family: 'Montserrat', sans-serif !important;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    border-radius: 30px 30px 0 0;
    box-shadow: 0 -4px 6px -2px rgba(0, 0, 0, 0.1);
`;

export const StyledDiv = styled.div`
    font-family: 'Montserrat', sans-serif !important;
`;
