import React from "react";
import BusinessSelector from "./BusinessSelector";
import {MainHeadingStyle} from "./Commons";
import {Divider} from "antd";

const BusinessHeading = ({heading}) => {
    return (
        <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
            <div>
                <BusinessSelector/>
            </div>
            <div>
                <h1 style={MainHeadingStyle}>{heading}</h1>
            </div>
        </div>
    )
}

export default BusinessHeading;
