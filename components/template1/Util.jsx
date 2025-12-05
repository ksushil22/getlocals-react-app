import React from 'react';
import {COLORS} from "./constants";
import {getMapUrl} from "../util/Commons";
import {AppleFilled, GoogleOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";


export const IconLink = ({text, href, icon, showIcon, color, className, preventDefault=false}) => {
    return <span>
        <a
            onClick={(e) => preventDefault? e.preventDefault(): null}
            className={className || 'icon-text'}
            href={href}
            target={"_blank"}
            style={{
                color: color || COLORS.PRIMARY_BACKGROUND,
                flex: '1 1 auto',

            }}> {showIcon ? icon : <span>{icon} {text} </span>} </a>
    </span>

}

export const MapLink = ({ address, icon }) => {
    const googleMapUrl = getMapUrl(address, 'google');
    const appleMapUrl = getMapUrl(address, 'apple');

    const mapMenuItems = [
        {
            key: 'google',
            label: (
                <a href={googleMapUrl} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit' }}>
                    <GoogleOutlined />
                    Open in Google Maps
                </a>
            ),
        },
        {
            key: 'apple',
            label: (
                <a href={appleMapUrl} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit' }}>
                    <AppleFilled />
                    Open in Apple Maps
                </a>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items: mapMenuItems }}
            trigger={['hover']}
            placement="bottom"
        >
            <span onClick={(e) => e.preventDefault()}>
                <IconLink
                    text={address}
                    href="#"
                    icon={icon}
                    preventDefault={true}
                />
            </span>
        </Dropdown>
    );
};
