import React from 'react';
import {COLORS} from "./constants";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import GetAnimation from "../util/GetAnimation";
import {Image} from "antd";

/**
 * AboutUsTemplate1 Component
 * 
 * Note: businessOwnerImageId is deprecated. Use ownerImageUrl instead.
 * Legacy `/image/{id}` endpoints are removed, so we rely on backend to include ownerImageUrl.
 */
const AboutUsTemplate1 = ({about, businessOwnerImageId, businessOwnerImageUrl, businessId, businessName}) => {
    const screens = useBreakpoint();
    
    // Prefer ownerImageUrl from backend (if available), otherwise no image will show
    // Legacy `/image/{id}` endpoint is removed
    const imageUrl = businessOwnerImageUrl || null;

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

                {imageUrl && (
                    <GetAnimation
                        animateOnce={true}
                        animateIn={"fadeInLeft"}
                        duration={1}>
                        <Image
                            src={imageUrl}
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
                )}
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
