import styled from "styled-components";
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";

export const COLORS = {
    PRIMARY: '#b8b8b8',
    PRIMARY_BACKGROUND: '#F5F5F5',
    PRIMARY_COLOR: '#2b2b2b'
}

export const StyledLayout = styled(Layout)`  
    font-family: 'Oswald', sans-serif !important;
`;

export const StyledContent = styled(Content)`  
    font-family: 'Oswald', sans-serif !important;
`;

export const StyledFooter = styled(Footer)`
    font-family: 'Oswald', sans-serif !important;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
`;

export const StyledDiv = styled.div`
    font-family: 'Oswald', sans-serif !important;
`;
