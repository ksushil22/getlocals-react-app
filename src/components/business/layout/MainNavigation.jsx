import React, {useContext, useState} from "react";
import {Image, Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBookOpen,
    faCommentDots,
    faFaceSmile,
    faHouseUser,
    faRightFromBracket, faUser
} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ActiveNavigationMenuContext} from "../../../context/ActiveNavigationProvider";
import {logOut} from "../../../redux/slicers/authSlicer";

export default function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateActiveNavigationMenu, activeNavigationMenu } = useContext(ActiveNavigationMenuContext);

    const items = [
        {
            label: (<Link to={"/business-admin/home/"}>Home</Link>),
            key: 'home',
            icon: <FontAwesomeIcon icon={faHouseUser}/>,
        },
        {
            label: (<Link to={'/business-admin/menu-items/'}>Menu</Link>),
            key: 'menu',
            icon: <FontAwesomeIcon icon={faBookOpen}/>,
        },
        {
            label: (<Link to={'/business-admin/reviews/'}>Reviews</Link>),
            key: 'reviews',
            icon: <FontAwesomeIcon icon={faCommentDots}/>
        },
        {
            label: (<Link to={'/business-admin/contact-request/'}>Contact Requests</Link>),
            key: 'contact_requests',
            icon: <FontAwesomeIcon icon={faFaceSmile}/>
        },
        {
            label: (<Link to={"/business-admin/employee-info/"}>Employee Info</Link>),
            key: 'employee-info',
            icon: <FontAwesomeIcon icon={faUser}/>
        },
        {
            label: (
                <Link to={'/authenticate'}
                      onClick={() => {
                          dispatch(logOut())
                          navigate('/authenticate/')
                      }}
                >Logout</Link>
            ),
            key: 'logout',
            icon: <FontAwesomeIcon icon={faRightFromBracket}/>
        },
    ];
    return (
        <div style={mainNavigation.container}>
            <Image
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flex:1,
                    maxHeight: 70,
                    width: 'auto',
                    padding: 10,
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/business-admin/home')}
                preview={false}
                src={require('../../../assets/img/GetLocals-logos/GetLocals-logos_transparent.png')}/>
            <Menu
                selectedKeys={[activeNavigationMenu]}
                theme={'light'}
                style={{
                    flex:1,
                    background: 'var(--primary-color)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '25%'
                }}
                mode={'horizontal'}
                items={items}
                overflowedIndicator={(<FontAwesomeIcon icon={faBars} color={'#fff'}/>)}
                overflowed={1}
                onClick={(item) => updateActiveNavigationMenu(item.key)}
            />
        </div>
    );
}

const mainNavigation = {
    container: {
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        background: 'var(--primary-color)',
        height: 70,
        paddingLeft: 20,
        paddingRight: 20,
    }
}
