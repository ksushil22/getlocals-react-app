'use client';

import React from "react";
import ModalPopup from "../../util/modals/ModalPopup";
import {Col, Image, Row} from "antd";
import {useSelector} from "react-redux";

const ContactRequestModal = ({
    visible,
    setVisible,
    request,
    setRequest
}) => {
    const businessId = useSelector((state) => state.business.businessId);
    
    // Use imageUrl from backend if available (preferred)
    // Legacy `/image/{id}` endpoints are removed, so we rely on backend to include imageUrl
    const imageUrl = request?.imageUrl || null;

    return <ModalPopup
        visible={visible}
        title={request?.subject}
        handleCancel={() => {
            setRequest(null)
            setVisible(false)
        }}
        disableScreenTouch={false}
        showCancel={false}
        showTitleIcon={false}
    >
        <Row style={{
            textAlign: 'left'
        }}>
            {imageUrl && (
                <Col style={{
                    textAlign: 'center'
                }} sm={24} md={24} lg={24}>
                    <Image
                        width={200}
                        alt={request?.fullName}
                        src={imageUrl}
                        style={{
                            borderRadius: '5px'
                        }}
                        loading={"lazy"}
                    />
                </Col>
            )}
            <Col>
                <p>{request?.fullName}</p>
                <p>
                    <a style={{
                        color: 'gray',
                        marginLeft: 20
                    }} href={`mailto:${request?.email}`}>{request?.email}</a>
                </p>
                <p>{request?.message}</p>
            </Col>
        </Row>

    </ModalPopup>
}

export default ContactRequestModal;
