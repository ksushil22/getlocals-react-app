import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useUserProfileQuery} from "../../../redux/services/authAPI";
import {Row} from "antd";
import "./home.css"
import AboutUs from "./AboutUs";
import {useLazyGetBusinessQuery} from "../../../redux/services/businessAPI";
import GetUpload from "../../util/upload/GetUpload";
import CustomPopover from "../../util/CustomPopover";
import BusinessSelector from "../../util/BusinessSelector";
import BusinessHeading from "../../util/BusinessHeading";
import Timings from "./Timings";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
import {PUBLIC_BUSINESS_API} from "../../../redux/api_url";
import ContactInformation from "./ContactInformation";

export default function Home() {
    const {data: userProfileData, isLoading} = useUserProfileQuery();
    const [triggerBusinessQuery, {
        data: businessData,
        isLoading: loadingBusinessData
    }] = useLazyGetBusinessQuery();
    const [logoImage, setLogoImage] = useState([])
    const businessId = useSelector((state) => state.business.businessId)

    useEffect(() => {
        if (businessData) {
            if (businessData.logo) {
                setLogoImage([
                    {
                        uid: businessId,
                        name: businessData.name,
                        status: 'done',
                        url: `${process.env.BASE_API_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${businessData.logo}/`
                    }
                ])
            }
        }
    }, [businessData]);

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


const homeStyle = {
    heading: {
        fontWeight: 'bolder',
        fontSize: '2.5em',
        paddingLeft: '30px',
        color: '#605f5f',
        margin: 0
    }
}
