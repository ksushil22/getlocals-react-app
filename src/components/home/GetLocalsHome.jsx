import React from 'react';
import Navigator from "./Navigator";
import {CenteredHalfDiv, MarketingInformationDiv} from "./StyledComponents";
import "./style.css"
import InformationDiv from "./MarketingHeadingDiv";
import ServicesTabs from "./ServicesTabs";
import {Link, useNavigate} from "react-router-dom";
import TakeYourBusiness from "./TakeYourBusiness";
import Footer from "./Footer";

const GetLocalsHome = () => {
    const navigate = useNavigate();
    return <div style={{
        background: 'white',
        fontFamily: 'Oswald'
    }}>
        <Navigator/>
        <MarketingInformationDiv>
            <InformationDiv/>
            <div className={"animate__animated animate__zoomIn"}>
                <img src={require('../../assets/img/business-marketing.png')} alt={"Business Image"} style={{
                    maxWidth: '60vw',
                    height: 'auto'
                }}/>
            </div>
        </MarketingInformationDiv>
        <CenteredHalfDiv>
            <p className={"animate__animated animate__fadeInDown"} style={{textAlign: 'center'}}>A single dashboard for
                Creating your Business' Website, Ads, Marketing and
                more. <span style={{
                    background: 'var(--primary-color)',
                }}><Link to={"/authenticate/registration/"} style={{
                    textDecoration: 'none',
                    color: 'var(--primary-background)'
                }}> Click here</Link></span> to get started. <br/>
                Best thing: No Technical Knowledge required.</p>
        </CenteredHalfDiv>
        <CenteredHalfDiv
            className={"digitized-div animate__animated animate__zoomIn"}
            style={{
                backgroundColor: 'var(--primary-background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
                borderRadius: 2,
                cursor: 'pointer',
                fontSize: 'larger',
                padding: 20
            }}
            onClick={()=> navigate('/authenticate/registration/')}
        >Lets get you digitalized...
        </CenteredHalfDiv>

        <ServicesTabs/>
        <TakeYourBusiness />
        <Footer />
    </div>
}

export default GetLocalsHome;
