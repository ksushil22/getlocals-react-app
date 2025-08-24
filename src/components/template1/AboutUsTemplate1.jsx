import React from 'react';
import {COLORS} from "./constants";
import {Image} from "antd";
import {getImageUrl} from "../util/Commons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import GetAnimation from "../util/GetAnimation";

const AboutUsTemplate1 = ({about, businessOwnerImageId, businessId, businessName}) => {
    const imageUrl = getImageUrl(businessId, businessOwnerImageId)

    const screens = useBreakpoint();

    return <div style={{
        backgroundColor: COLORS.PRIMARY_BACKGROUND,
        margin: 10,
    }}>
        <div
            id={'about-us'}
            style={{
                display: 'flex',
                flexDirection: screens.md ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: 'white'
            }}>
            <div className="image-container"
                 style={{
                     display: 'flex',
                     justifyContent: 'center',
                     flex: screens.md ? '0 0 40%' : '1'}}>

                <GetAnimation
                    animateOnce={true}
                    animateIn={"fadeInLeft"}
                    duration={1}>
                    <Image
                        height={'70vh'}
                        width={'auto'}
                        style={{
                            objectFit: 'contain'
                        }}
                        src={imageUrl}
                        alt="image"
                        loading="lazy"
                        preview={false}
                    />
                </GetAnimation>
            </div>
            <div className="about-us-container" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flexWrap: 'wrap'
            }}>

                <GetAnimation
                    animateIn={"fadeInRight"}
                    animateOnce={true}
                    duration={1}>
                    <span style={{
                        position: 'relative',
                        top: 10,
                        marginTop: 0,
                        color: COLORS.PRIMARY_COLOR,
                        textAlign: 'center',
                        fontSize: 'xxx-large',
                        fontWeight: 'bolder',
                        textTransform: 'uppercase',
                    }}>{businessName}</span>
                    <p style={{ color: COLORS.PRIMARY_COLOR }}>
                        {about}
                    </p>
                </GetAnimation>
            </div>
        </div>
    </div>
}

export default AboutUsTemplate1;
