import React, {useState} from 'react';
import {Drawer, List} from "antd";
import {templateIds} from "../../util/TemplateIdConstants";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {COLORS, StyledDiv} from "../constants";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBookOpen, faCommentDots, faHouseUser, faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import "./style.css"
import {scrollToSection} from "../../util/Commons";
import {useGetBusinessLogoQuery} from "../../../redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
const TEMPLATE_ID = templateIds.Template1;

export const items = (lastSegment, navigate) =>  [
    {
        label: (<Link to={`/${TEMPLATE_ID}/home/`} style={{color: COLORS.PRIMARY_COLOR}}>Home</Link>),
        key: 'home',
        icon: <FontAwesomeIcon icon={faHouseUser}/>,
        link: `/${TEMPLATE_ID}/home/`
    },
    {
        label: (<Link to={`/${TEMPLATE_ID}/menu`} style={{color: COLORS.PRIMARY_COLOR}}>Menu</Link>),
        key: 'menu',
        icon: <FontAwesomeIcon icon={faBookOpen}/>,
        link: `/${TEMPLATE_ID}/menu/`
    },
    {
        label: (<span style={{color: COLORS.PRIMARY_COLOR}}>Review</span>),
        key: 'reviews',
        icon: <FontAwesomeIcon icon={faStar}/>,
        callback: () => {
            if (lastSegment === 'home') {
                scrollToSection('review')
            } else {
                navigate(`/${TEMPLATE_ID}/home/`, { state: { scrollTo: 'review' } });
            }
        }
    },
    {
        label: (<span style={{color: COLORS.PRIMARY_COLOR}}>About Us</span>),
        key: 'about-us',
        icon: <FontAwesomeIcon icon={faCommentDots}/>,
        callback: () => {
            if (lastSegment === 'home') {
                scrollToSection('about-us')
            } else {
                navigate(`/${TEMPLATE_ID}/home/`, { state: { scrollTo: 'about-us' } });
            }
        }
    }
];
const Template1NavBar = () => {
    const screens = useBreakpoint();
    const location = useLocation()
    const businessId = useSelector((state) => state.templateBusiness.businessId);
    const marginLeftLogo = screens.lg || screens.xl || screens.xxl ? 50 : 20;
    const {data: logo, isLoading: loadingLogo} = useGetBusinessLogoQuery({businessId})

    const pathSegments = location.pathname.split('/').filter(segment => segment)
    const lastSegment = pathSegments[pathSegments.length-1];

    const Logo = () => (
        loadingLogo ? <GetLoader display={DISPLAY.AREA} spinner={SPINNERS.SKELETON_IMAGE}/>
            :
            <img
                height={60}
                width={'auto'}
                style={{
                    marginLeft: marginLeftLogo,
                    cursor: 'pointer'
                }}
                loading={"lazy"}
                onClick={() => navigate(`/${TEMPLATE_ID}/home/`)}
                src={logo?.url}
                alt={businessId}
            />)

    const navigate = useNavigate()


    const DrawerNavBar = () => {
        const [open, setOpen] = useState(false)

        return <div
            style={{
                cursor: "pointer",
                float: "right",
                alignItems: 'right',
                justifyContent: 'right',
                display: 'flex', // Use flex layout for the container
                flexWrap: 'wrap', // Allow items to wrap to the next line if needed
                width: '100%',
            }}>
            <div
                onClick={() => setOpen(true)}>
                <FontAwesomeIcon
                    icon={open ? faXmark : faBars} size={'lg'}/>
            </div>
            <Drawer
                rootClassName={"nav-bar-drawer"}
                placement={'right'}
                open={open}
                onClose={() => setOpen(false)}
                extra={<Logo/>}
                styles={{
                    backgroundColor: COLORS.PRIMARY_BACKGROUND
                }}
            >
                <List
                    dataSource={items(lastSegment, navigate)}
                    size={"large"}
                    renderItem={(item) => (
                        <List.Item
                            className={"drawer-nav-item"}
                            onClick={() => {
                                if (item.callback) {
                                    item.callback()
                                } else {
                                    navigate(item.link)
                                }
                                setOpen(false)
                            }}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <StyledDiv>
                                {item.icon} {item.label}
                            </StyledDiv>
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    }

    const ListNavBar = () => {

        return <List
            style={{
                background: 'none',
                color: 'black',
                float: 'right',
                alignItems: 'right',
                justifyContent: 'right',
                marginRight: 100,
                display: 'flex', // Use flex layout for the container
                flexWrap: 'wrap', // Allow items to wrap to the next line if needed
                width: '100%',
                height: 60
            }}
            grid={{gutter: 24, column: items(lastSegment, navigate).length}}
            dataSource={items(lastSegment, navigate)}
            size={"large"}
            renderItem={item => (
                <StyledDiv
                    onClick={() => {
                        if (item.callback) {
                            item.callback()
                        } else {
                            navigate(item.link)
                        }
                    }}
                    className={'navbar-item'}
                    style={{
                        display: 'inline-block',
                        marginRight: 20,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 100,
                        maxWidth: '300px',
                        textAlign: 'center',
                    }}><span>{item.icon} {item.label}</span></StyledDiv>
            )}
        />
    }

    const NavBar = screens.lg || screens.xl || screens.xxl ? ListNavBar : DrawerNavBar;

    return <div style={{
        backgroundColor: 'rgba(245,245,245,0.8)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'sticky',
        alignItems: 'center',
        padding: '0 20px',
        top: 0,
        zIndex: 1000
    }}>
        <Logo/>
        <div style={{
            flex: 1,
            height: 60,
            display: 'flex',
            alignItems: 'center',
        }}>
            <NavBar/>
        </div>
    </div>

}

export default Template1NavBar;
