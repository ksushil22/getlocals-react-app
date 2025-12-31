import React from 'react';
import {FooterDiv} from "./StyledComponents";

const Footer = () => {
    return <FooterDiv>
        <div style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
        }}>
            © 2024 Neo Corporation, All rights reserved.
        </div>
    </FooterDiv>;
}

export default Footer;
