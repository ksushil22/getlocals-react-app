import React, {useEffect, useState} from "react";
import {Image, List, Row} from "antd";
import BusinessHeading from "../../util/BusinessHeading";
import {useGetAllContactRequestsQuery} from "../../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
import {PUBLIC_BUSINESS_API} from "../../../redux/api_url";
import NoDataGIF from "../../util/NoDataGIF";
import ContactRequestModal from "./ContactRequestModal";

import './contactRequest.css'


const BASE_URL = process.env.BASE_API_URL;

const ContactRequest = () => {
    const businessId = useSelector((state) => state.business.businessId);
    const {
        data: contactRequests,
        isLoading: loadingContactRequests,
        refetch: refetchContactRequests
    } = useGetAllContactRequestsQuery({businessId}, {skip: businessId === null});

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalData, setModalData] = useState(null)
    useEffect(() => {
        if (businessId) {
            refetchContactRequests();
        }
    }, [businessId])

    const ContactItemCard = ({item}) => {
        return <List.Item
            onClick={() => {
                setModalData(item)
                setIsModalVisible(true)
            }}
            className={"contact-request-card"}
            key={item.id}
            style={{
                cursor: 'pointer'
            }}
            extra={
                item?.imageId && (
                    <Image
                        preview={false}
                        alt={item.fullName}
                        src={`${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${item.imageId}/`}
                        style={{
                            width: 150,
                            height: 150,
                            objectFit: 'contain',
                            borderRadius: 5
                        }}
                        loading={"lazy"}/>)
            }
        >
            <List.Item.Meta
                title={item.fullName}
                description={<p>&nbsp;{item.subject}</p>}
            />
            {item.message}
        </List.Item>
    }

    return <Row>
        <BusinessHeading heading={"Contact Requests"}/>
        {loadingContactRequests ? <GetLoader spinner={SPINNERS.SKELETON_LIST} display={DISPLAY.AREA}/> :
            <List
                itemLayout="vertical"
                style={{
                    width: '100%',
                    marginTop: 50
                }}
                size="large"
                dataSource={contactRequests}
                renderItem={(request) => (
                    <ContactItemCard
                        item={request}
                    />)}
                locale={{
                    emptyText: <NoDataGIF message={"No Request Available."}/>
                }}
            />
        }
        <ContactRequestModal
            visible={isModalVisible}
            setVisible={setIsModalVisible}
            request={modalData}
            setRequest={setModalData}
        />

    </Row>
}

export default ContactRequest;
