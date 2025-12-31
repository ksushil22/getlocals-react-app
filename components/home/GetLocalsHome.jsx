import React from 'react';
import Navigator from "./Navigator";
import {CenteredHalfDiv, MarketingInformationDiv} from "./StyledComponents";
import "./style.css"
import InformationDiv from "./MarketingHeadingDiv";
import ServicesTabs from "./ServicesTabs";
import Link from "next/link";
import {useRouter} from "next/navigation";
import TakeYourBusiness from "./TakeYourBusiness";
import Footer from "./Footer";
import GetAnimation from "@/components/util/GetAnimation";

const GetLocalsHome = () => {
    const router = useRouter();
    return <div style={{
        background: 'white',
        fontFamily: 'Montserrat'
    }}>
        <Navigator/>
        <MarketingInformationDiv>
            <InformationDiv/>
            <GetAnimation animateIn="zoomIn" duration={0.8}>
                <div>
                    <img src={'/img/business-marketing.png'} alt={"Business Image"} style={{
                        maxWidth: '60vw',
                        height: 'auto'
                    }}/>
                </div>
            </GetAnimation>
        </MarketingInformationDiv>
        <CenteredHalfDiv>
            <GetAnimation animateIn="fadeInDown" duration={0.6}>
                <p style={{textAlign: 'center'}}>A single dashboard for
                    Creating your Business' Website, Ads, Marketing and
                    more. <span style={{
                        background: 'var(--primary-color)',
                    }}><Link href={"/authenticate/registration/"} style={{
                        textDecoration: 'none',
                        color: 'var(--primary-background)'
                    }}> Click here</Link></span> to get started. <br/>
                    Best thing: No Technical Knowledge required.</p>
            </GetAnimation>
        </CenteredHalfDiv>
        <GetAnimation animateIn="zoomIn" duration={0.8}>
            <CenteredHalfDiv
                className={"digitized-div"}
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
                onClick={()=> router.push('/authenticate/registration/')}
            >Lets get you digitalized...
            </CenteredHalfDiv>
        </GetAnimation>

        <ServicesTabs/>
        <TakeYourBusiness />
        <Footer />
    </div>
}

export default GetLocalsHome;
