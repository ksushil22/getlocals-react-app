import React from 'react';
import {COLORS} from "./constants";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import GetAnimation from "../util/GetAnimation";
import { getImageUrl } from "../../utils/imageUtils";
import {Image} from "antd";

const AboutUsTemplate1 = ({about, businessOwnerImageId, businessId, businessName}) => {
    const screens = useBreakpoint();

    return <div style={{
        backgroundColor: COLORS.PRIMARY_BACKGROUND,
        margin: 10,
    }}>
        <div style={{
            color: COLORS.PRIMARY_COLOR,
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 'xxx-large',
            fontWeight: 'bolder',
            textTransform: 'uppercase',
        }}>{businessName}</div>
        <div
            id={'about-us'}
            style={{
                display: 'flex',
                flexDirection: screens.md ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: COLORS.PRIMARY_BACKGROUND
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
                        src={getImageUrl(businessId, businessOwnerImageId)}
                        height={'70vh'}
                        width={'auto'}
                        style={{
                            objectFit: 'contain'
                        }}
                        alt={`${businessName} owner`}
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
                justifyContent: 'space-between',
                textAlign: 'center',
                flexWrap: 'wrap',
                padding: 10
            }}>

                <GetAnimation
                    animateIn={"fadeInRight"}
                    animateOnce={true}
                    duration={1}>
                    <div style={{
                        alignItems: 'center',
                    }}>
                        <p style={{
                            textAlign: 'justify',
                            fontSize: 'large',
                            fontWeight: 'normal',
                            color: COLORS.PRIMARY_COLOR,
                            whiteSpace: 'pre-wrap',
                            maxWidth: '500px'
                        }}>
                            {about}
                        </p>
                    </div>
                </GetAnimation>
            </div>
        </div>
    </div>
}

export default AboutUsTemplate1;
