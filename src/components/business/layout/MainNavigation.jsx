import React, {useContext, useState} from "react";
import {Image, Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBookOpen, faCartShopping,
    faCommentDots,
    faFaceSmile,
    faHouseUser,
    faRightFromBracket, faUser
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {ActiveNavigationMenuContext} from "../../../context/ActiveNavigationProvider";
import {logOut} from "../../../redux/slicers/authSlicer";

export default function () {
    const dispatch = useDispatch();
    const router = useRouter();
    const { updateActiveNavigationMenu, activeNavigationMenu } = useContext(ActiveNavigationMenuContext);

    const items = [
        {
            label: (<Link href={"/business-admin/home/"}>Home</Link>),
            key: 'home',
            icon: <FontAwesomeIcon icon={faHouseUser}/>,
        },
        {
            label: (<Link href={"/business-admin/orders/"}>Orders</Link>),
            key: 'order',
            icon: <FontAwesomeIcon icon={faCartShopping} />,
        },
        {
            label: (<Link href={'/business-admin/menu-items/'}>Menu</Link>),
            key: 'menu',
            icon: <FontAwesomeIcon icon={faBookOpen}/>,
        },
        {
            label: (<Link href={'/business-admin/reviews/'}>Reviews</Link>),
            key: 'reviews',
            icon: <FontAwesomeIcon icon={faCommentDots}/>
        },
        {
            label: (<Link href={'/business-admin/contact-request/'}>Contact Requests</Link>),
            key: 'contact_requests',
            icon: <FontAwesomeIcon icon={faFaceSmile}/>
        },
        {
            label: (<Link href={"/business-admin/employee-info/"}>Employee Info</Link>),
            key: 'employee-info',
            icon: <FontAwesomeIcon icon={faUser}/>
        },
        {
            label: (
                <Link href={'/authenticate'}
                      onClick={() => {
                          dispatch(logOut())
                          router.push('/authenticate/')
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
                onClick={() => router.push('/business-admin/home')}
                preview={false}
                src={'img/GetLocals-logos/GetLocals-logos_transparent.png'}/>
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
