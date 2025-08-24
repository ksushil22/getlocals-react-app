import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

const GetAnimation = ({animateIn, animateOnce=true, duration=0.5, style, children}) => {
    return <ScrollAnimation
        style= {style}
        animateIn={animateIn}
        animateOnce={animateOnce}
        duration={duration}
    >
        {children}
    </ScrollAnimation>
}

export default GetAnimation;
