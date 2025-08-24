import React from 'react';
import {useSelector} from "react-redux";
import {useGetFooterContentQuery} from "../../redux/services/businessAPI";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {COLORS} from "./constants";
import {items} from "./layout/Template1NavBar";
import {IconLink} from "./Util";
import {FacebookFilled, InstagramFilled, YoutubeFilled} from "@ant-design/icons";


// Container for the footer
const StyledFooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    padding: 1rem;

    @media (max-width: 1052px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

// Container for the timings section
const StyledTimingContainer = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
`;

// Container for the navigation menu
const StyledNavMenuContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-style: solid;
    border-color: #ccc;
    border-width: 0 1px;

    @media (max-width: 1052px) {
        margin-top: 10px;
        border-width: 1px 0;
        padding: 20px 0;
    }
`;

// Container for the social handles section
const StyledSocialContainer = styled.div`
  flex: 1;
  text-align: center;

    @media (max-width: 1052px) {
        margin-top: 10px;
    }
`;

const StyledCopyright = styled.div`
    text-align: center;
`

const FooterHeading = styled.span`
    color: ${COLORS.PRIMARY_COLOR};
    font-weight: bolder;
    text-decoration: underline;
`

const Template1Footer = () => {
    const businessId = useSelector((state) => state.templateBusiness.businessId);
    const {
        data: footerContent,
        isLoading: loadingFooterContent
    } = useGetFooterContentQuery({businessId: businessId})
    const location = useLocation();
    const navigate = useNavigate();
    const pathSegments = location.pathname.split('/').filter(segment => segment)
    const lastSegment = pathSegments[pathSegments.length-1];

    return(
        <>
            <StyledFooterContainer className="footer-container">
                <StyledTimingContainer>
                    <FooterHeading>Business Hours</FooterHeading>
                    <span>Monday: <span>{footerContent?.timings?.monday}</span></span>
                    <span>Tuesday: <span>{footerContent?.timings?.tuesday}</span></span>
                    <span>Wednesday: <span>{footerContent?.timings?.wednesday}</span></span>
                    <span>Thursday: <span>{footerContent?.timings?.thursday}</span></span>
                    <span>Friday: <span>{footerContent?.timings?.friday}</span></span>
                    <span>Saturday: <span>{footerContent?.timings?.saturday}</span></span>
                    <span>Sunday: <span>{footerContent?.timings?.sunday}</span></span>
                </StyledTimingContainer>
                <StyledNavMenuContainer>
                    {items(lastSegment, navigate)?.map((item) => {
                        return (<FooterHeading
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={() => item.callback? item.callback() : navigate(item.link)}
                            key={item.key}>
                            {item.label}
                        </FooterHeading>)
                    })}
                </StyledNavMenuContainer>
                <StyledSocialContainer>
                    <div>
                        {footerContent?.contactInfo?.instagramUrl && <IconLink className={'instagram'}
                                                                               color={'#000'}
                                                                               text={""} icon={<InstagramFilled style={{fontSize: '1.2em', marginLeft: 5}}/>}
                                                                               showIcon={true}
                                                                               href={footerContent?.contactInfo?.instagramUrl}/>}
                        {footerContent?.contactInfo?.facebookUrl && <IconLink className={'facebook'}
                                                                              color={'#000'}
                                                                              text={""} icon={<FacebookFilled style={{fontSize: '1.2em', marginLeft: 5}}/>} showIcon={true}
                                                                              href={footerContent?.contactInfo?.facebookUrl}/>}
                        {footerContent?.contactInfo?.youtubeUrl && <IconLink className={'youtube'}
                                                                             color={'#000'}
                                                                             text={""} icon={<YoutubeFilled  style={{fontSize: '1.2em', marginLeft: 5}}/>} showIcon={true}
                                                                             href={footerContent.contactInfo?.youtubeUrl}/>}
                    </div>
                </StyledSocialContainer>
            </StyledFooterContainer>
            <StyledCopyright>
                © 2024 Neo Corporation, All rights reserved.
            </StyledCopyright>
        </>
    )
}

export default Template1Footer;
