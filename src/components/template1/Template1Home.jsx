import React, {useEffect, useState} from 'react';
import {Row} from "antd";
import {useGetBusinessImagesQuery, useGetPublicBusinessInfoQuery} from "../../redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../util/customSpinner/GetLoader";
import ProgressiveCarousel from "../util/carousel/ProgressiveCarousel";
import {COLORS, StyledDiv} from "./constants";
import AboutUsTemplate1 from "./AboutUsTemplate1";
import TeamTemplate1 from "./TeamTemplate1";
import ReviewTemplate1 from "./ReviewTemplate1";
import {useSearchParams} from "next/navigation";
import {scrollToSection} from "../util/Commons";

const Template1Home = ({
                           businessId
                       }) => {
    const searchParams = useSearchParams();
    const [images, setImages] = useState([]);
    const {data: carouselImages, isLoading: loadingCarouselImages} = useGetBusinessImagesQuery({
        'businessId': businessId, 'type': 'CAROUSEL'
    })

    const {
        data: businessData,
        isLoading: loadingBusinessData,
        refetch: refetchBusinessInfo
    } = useGetPublicBusinessInfoQuery({businessId: businessId}, {skip: businessId === null});

    useEffect(() => {
        const scrollTo = searchParams.get('scrollTo');
        if (scrollTo) {
            const timer = setTimeout(() => {
                scrollToSection(scrollTo)
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [searchParams]);
    useEffect(() => {
        if (businessId) {
            refetchBusinessInfo()
        }
    }, [businessId, refetchBusinessInfo]);

    useEffect(() => {
        if (carouselImages) {
            // Use the image objects directly for progressive loading
            setImages(carouselImages);
        }

    }, [carouselImages, setImages])

    if (loadingBusinessData || loadingCarouselImages) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER}/>
    }
    return <StyledDiv style={{
        width: '100%'
    }}>
        {loadingCarouselImages ? (
            <GetLoader spinner={SPINNERS.ROTATING_DOT_SPINNER} display={DISPLAY.AREA}/>
        ) : (
            <ProgressiveCarousel 
                images={images} 
                businessId={businessId}
                background={COLORS.PRIMARY_BACKGROUND}
            />
        )}
        <AboutUsTemplate1 about={businessData?.aboutUs}
                          businessId={businessId}
                          businessOwnerImageId={businessData?.ownerImageId}
                          businessName={businessData?.name}/>
        <TeamTemplate1 businessId={businessId} />
        <ReviewTemplate1 />
    </StyledDiv>
}

export default Template1Home;
