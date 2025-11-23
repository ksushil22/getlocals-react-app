import React from 'react';
import {useSelector} from "react-redux";
import {COLORS, StyledDiv} from "../constants";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {useGetContactInformationQuery} from "../../../redux/services/businessAPI";
import {IconLink, MapLink} from "../Util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FacebookFilled, InstagramFilled, YoutubeFilled, AppleFilled, GoogleOutlined} from "@ant-design/icons";
import {faEnvelope, faMapLocation, faPhone} from "@fortawesome/free-solid-svg-icons";
import {formatPhoneNumber, getMapUrl} from "../../util/Commons";
import GetLoader, {SPINNERS} from "../../util/customSpinner/GetLoader";
import { Dropdown } from 'antd';
import "./style.css"

const BusinessContactInformation = () => {
    const businessId = useSelector((state) => state.templateBusiness.businessId);

    const {data: contactInformation, isLoading: loadingContactInformation}
        = useGetContactInformationQuery({businessId: businessId})
    const screens = useBreakpoint();
    const largeScreen = !(screens.lg || screens.xl || screens.xxl);
    
    if (loadingContactInformation) {
        return <GetLoader spinner={SPINNERS.ROTATING_DOT_SPINNER} />
    }



    return <StyledDiv className={"container"} style={BusinessContactInformationStyles.container}>
        <div className={'content'} style={largeScreen? BusinessContactInformationStyles.contentMobile : BusinessContactInformationStyles.content}>
            <div className={"contact-info"} style={{
                margin: '0 10px',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'smaller',
                textTransform: 'uppercase',
                marginTop: largeScreen ? 10 : 0
            }}>
                <MapLink
                    address={contactInformation?.address}
                    icon={<FontAwesomeIcon icon={faMapLocation}/>}
                />
                <IconLink text={formatPhoneNumber(contactInformation?.phone1)} icon={<FontAwesomeIcon icon={faPhone} /> }
                          href={`tel:${contactInformation?.phone1}`}/>
                <IconLink text={contactInformation?.email} icon={<FontAwesomeIcon icon={faEnvelope}/>}
                          href={`mailto:${contactInformation?.email}`}/>
            </div>
            <div className={"socials-info"} style={{
                order: -1,
                gap: 5
            }}>
                {contactInformation?.instagramUrl && <IconLink className={'instagram'}
                           text={""} icon={<InstagramFilled style={{fontSize: '1.2em', marginLeft: 5}}/>}
                           showIcon={true}
                           href={contactInformation?.instagramUrl}/>}
                {contactInformation?.facebookUrl && <IconLink className={'facebook'}
                           text={""} icon={<FacebookFilled style={{fontSize: '1.2em', marginLeft: 5}}/>} showIcon={true}
                           href={contactInformation?.facebookUrl}/>}
                {contactInformation?.youtubeUrl && <IconLink className={'youtube'}
                           text={""} icon={<YoutubeFilled style={{fontSize: '1.2em', marginLeft: 5}}/>} showIcon={true}
                           href={contactInformation?.youtubeUrl}/>}
            </div>
        </div>
    </StyledDiv>

}

export default BusinessContactInformation;

const BusinessContactInformationStyles = {
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: COLORS.PRIMARY_COLOR,
        minHeight: 60,
    },
    content: {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '100%'
    },
    contentMobile: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    }
}
