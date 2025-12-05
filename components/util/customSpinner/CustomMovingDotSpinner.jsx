import React from "react";

function CustomMovingDotSpinner({
                            text="Loading..."
                         }) {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
            margin: 'auto',
            display: 'block',
            shapeRendering: 'auto',
        }}
        width="120px"
        height="120px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
    >
        <circle cx="84" cy="50" r="10" fill="#614044">
            <animate attributeName="r" repeatCount="indefinite" dur="0.3205128205128205s" calcMode="spline"
                     keyTimes="0;1" values="11;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
            <animate attributeName="fill" repeatCount="indefinite" dur="1.282051282051282s" calcMode="discrete"
                     keyTimes="0;0.25;0.5;0.75;1" values="#614044;#b0747a;#8e5e63;#704a4e;#614044" begin="0s"></animate>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#614044">
            <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="0;0;11;11;11"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        </circle>
        <circle cx="50" cy="50" r="10" fill="#704a4e">
            <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="0;0;11;11;11"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                     begin="-0.3205128205128205s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                     begin="-0.3205128205128205s"></animate>
        </circle>
        <circle cx="84" cy="50" r="10" fill="#8e5e63">
            <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="0;0;11;11;11"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.641025641025641s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.641025641025641s"></animate>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#b0747a">
            <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="0;0;11;11;11"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                     begin="-0.9615384615384615s"></animate>
            <animate attributeName="cx" repeatCount="indefinite" dur="1.282051282051282s" calcMode="spline"
                     keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                     begin="-0.9615384615384615s"></animate>
        </circle>
    </svg>
}

export default CustomMovingDotSpinner;
