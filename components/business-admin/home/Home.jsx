'use client';

import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useUserProfileQuery} from "@/lib/redux/services/authAPI";
import {Row} from "antd";
import "./home.css"
import AboutUs from "./AboutUs";
import {useLazyGetBusinessQuery, useGetBusinessImagesQuery} from "@/lib/redux/services/businessAPI";
import GetUpload from "../../util/upload/GetUpload";
import CustomPopover from "../../util/CustomPopover";
import BusinessSelector from "../../util/BusinessSelector";
import BusinessHeading from "../../util/BusinessHeading";
import Timings from "./Timings";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
import ContactInformation from "./ContactInformation";
import {buildImageMap, getImageFromMap} from "../../util/Commons";

export default function Home() {
    const {data: userProfileData, isLoading} = useUserProfileQuery();
    const [triggerBusinessQuery, {
        data: businessData,
        isLoading: loadingBusinessData
    }] = useLazyGetBusinessQuery();
    const [logoImage, setLogoImage] = useState([])
    const businessId = useSelector((state) => state.business.businessId)
    
    // Fetch LOGO images to get logo URL
    const {data: logoImages} = useGetBusinessImagesQuery(
        {businessId, type: 'LOGO'}, 
        {skip: !businessId}
    );
    
    // Build image map for logo lookup
    const imageMap = useMemo(() => buildImageMap(logoImages), [logoImages]);

    useEffect(() => {
        if (businessData) {
            if (businessData.logo) {
                // Get logo URL from image map or from businessData if backend provides it
                const imageData = getImageFromMap(imageMap, businessData.logo);
                const logoUrl = businessData.logoUrl || imageData?.imageUrl || null;
                
                setLogoImage([
                    {
                        uid: businessData.logo,
                        name: businessData.name,
                        status: 'done',
                        url: logoUrl
                    }
                ])
            } else {
                setLogoImage([])
            }
        }
    }, [businessData, imageMap]);

    useEffect(() => {
        if (businessId) {
            triggerBusinessQuery(businessId)
        }
    }, [businessId, triggerBusinessQuery]);

    const user = userProfileData ? userProfileData.user : null;

    return (
        <Row>
            <BusinessHeading heading={`Welcome ${user ? user.name.split(' ')[0] : ''} !`} />
            {/* Logo uploader for businesses */}
            <div>
                <p style={{
                    fontSize:20
                }}>Business Logo</p>
                <GetUpload
                    type={"LOGO"}
                    maxUploads={1}
                    accept="image/png, image/jpeg"
                    initialFileList={logoImage}
                    updateInitialList={true}
                    />

            </div>
            <AboutUs aboutUs={businessData?.aboutUs} isLoading={loadingBusinessData}/>
            <ContactInformation businessId={businessId}/>
            <div style={{
                width: '100%'
            }}>
                <p style={{
                    fontSize: 20
                }}>Upload Carousel Pictures <CustomPopover
                    content={"We suggest uploading authentic pictures clicked by you. This will be displayed" +
                        " on the very top."}/></p>
                <GetUpload
                    type={"CAROUSEL"}
                    maxUploads={3}
                    accept="image/png, image/jpeg"/>
            </div>
            <Timings businessId={businessId}/>

        </Row>
    );
}
