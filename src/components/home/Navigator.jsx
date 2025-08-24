import React, {useEffect, useState} from 'react';
import {NavigatorDiv} from "./StyledComponents";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";


const Navigator = () => {
    const navigate = useNavigate();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDiff = lastScrollY - currentScrollY;

            // Determine the new offset value
            let newOffset = offset + scrollDiff;
            newOffset = Math.max(Math.min(newOffset, 0), -100); // Clamp the offset between -100 (fully hidden) and 0 (fully visible)

            setOffset(newOffset);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, offset]);

    return <NavigatorDiv style={{transform: `translateY(${offset}px)`}}>
        <img style={{
            marginLeft: 10
        }} height={48}
             src={require('../../assets/img/GetLocals-logos/GetLocals-logos_transparent.png')} alt={'logo'}/>
        <div style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 10
        }}>
            <Button
                style={{
                    color: 'var(--primary-background)',
                    height: 50,
                    fontFamily: 'Oswald'
                }}
                type={"text"} onClick={() => navigate("/authenticate/registration/")}>Get Started</Button>
        </div>
    </NavigatorDiv>
}

export default Navigator;
