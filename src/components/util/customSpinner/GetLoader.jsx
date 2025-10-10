import React from "react";
import { Skeleton } from "antd";
import CustomMovingDotSpinner from "./CustomMovingDotSpinner";
import CustomRotatingDotsSpinner from "./CustomRotatingDotsSpinner";

export const DISPLAY = {
    FULLSCREEN: 0,
    AREA: 1
};

export const SPINNERS = {
    MOVING_DOT_SPINNER: <CustomMovingDotSpinner />,
    SKELETON: <Skeleton active={true} paragraph={{ rows: 6 }} />,
    ROTATING_DOT_SPINNER: <CustomRotatingDotsSpinner />,
    SKELETON_LIST: (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', width: '100%', margin: '10px 0' }}>
                <Skeleton loading={true} active={true} style={{ flex: 1 }} />
                <Skeleton.Image style={{ marginLeft: 30 }} active={true}/>
            </div>
        </div>
    ),
    SKELETON_LIST_REVERSED: (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', width: '100%', margin: '10px 0' }}>
                <Skeleton.Image style={{ marginLeft: 30 }} active={true}/>
                <Skeleton loading={true} active={true} style={{ flex: 1 }} />
            </div>
        </div>
    ),
    SKELETON_IMAGE: <Skeleton.Image style={{ marginLeft: 30 }} />,
    OTHER: 'other'
};

export default function GetLoader({
                                   display = DISPLAY.FULLSCREEN,
                                   text = "Loading...",
                                   spinner = SPINNERS.ROTATING_DOT_SPINNER,
                                   otherSpinner = null
                               }) {
    const containerStyle =
        display === DISPLAY.FULLSCREEN
            ? { ...loaderStyles.centerAlign, ...loaderStyles.fullScreen }
            : { ...loaderStyles.areaContainer };

    return (
        <div style={containerStyle}>
            {spinner === SPINNERS.OTHER ? otherSpinner : spinner}
        </div>
    );
}

const loaderStyles = {
    areaContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    centerAlign: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    fullScreen: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: 'rgb(206, 206, 206)',
        zIndex: 1000
    }
};
