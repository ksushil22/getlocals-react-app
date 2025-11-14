import React from "react";
import { motion } from "framer-motion";

const animationVariants = {
    fadeInDown: {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
    },
    fadeOutUp: {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 0, y: -100 },
    },
    fadeInUp: {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
    },
    fadeOutDown: {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 0, y: 100 },
    },
    fadeInLeft: {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
    },
    zoomIn: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
    },
    // add more mappings as you need
};

const GetAnimation = ({
                          children,
                          style,
                          className,
                          duration = 0.5,
                          delay = 0,
                          animateOnce = true,
                          amount = 0.2,
                          animateIn = "fadeInUp",
                          animateOut,
                      }) => {
    const variants = animationVariants[animateIn] || animationVariants.fadeInUp;

    return (
        <motion.div
            style={style}
            className={className}
            initial="hidden"
            whileInView="visible"
            exit={animateOut ? "hidden" : undefined}
            viewport={{ once: animateOnce, amount }}
            transition={{ duration, delay }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default GetAnimation;
