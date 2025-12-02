import React, {useEffect, useState} from 'react';
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useUserProfileQuery} from "../../redux/services/authAPI";
import {setCurrentBusiness} from "../../redux/slicers/businessSlicer";
import {useDispatch, useSelector} from "react-redux";
import GetLoader, {DISPLAY, SPINNERS} from "./customSpinner/GetLoader";

export default function BusinessSelector() {
    const dispatch = useDispatch();
    const {data: userProfileData, isLoading} = useUserProfileQuery();
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const businessId = useSelector((state) => state.business.businessId);

    useEffect(() => {
        if (!isLoading && userProfileData && userProfileData.businesses.length > 0) {
            const firstBusiness = userProfileData.businesses[0];
            setBusinesses(userProfileData.businesses);
            const business = userProfileData.businesses.find(business => business.id === businessId) || firstBusiness
            setSelectedBusiness(business);
        }
    }, [businessId, isLoading, userProfileData]);

    useEffect(() => {
        if (selectedBusiness) {
            dispatch(setCurrentBusiness({id: selectedBusiness.id}));
        }
    }, [selectedBusiness, dispatch]);

    const handleMenuClick = (e) => {
        setSelectedBusiness({
            id: e.key,
            name: e.label
        });
    };

    const items = businesses.map(business => ({
        label: <p style={{fontWeight: 'bold'}}>{business.name}</p>,
        key: business.id
    }));

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    if (isLoading) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />
    }

    return (
        <>
            {businesses.length !== 0 ?
                businesses.length === 1 ?
                    <p style={SelectorStyles.paragraph}>
                        {businesses[0].name}
                    </p> :
                    <Dropdown menu={menuProps}>
                        <button style={{
                            border: 'none',
                            background: 'none',
                            borderBottom: '1px solid black',
                            fontSize: 'medium',
                            height: '50px',
                            fontWeight: 'bold',
                        }}>
                            <Space>Your Businesses <DownOutlined/></Space>
                        </button>
                    </Dropdown> :
                <p style={SelectorStyles.paragraph}>Register a business</p>}
        </>
    );
}

const SelectorStyles = {
    paragraph: {
        borderBottom: '1px solid black',
        fontSize: 'medium',
        height: '30px',
        padding: 0,
        fontWeight: 'bold',
        display: 'inline-block',
        float: 'right'
    }
}
