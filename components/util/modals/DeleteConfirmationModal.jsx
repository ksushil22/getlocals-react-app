import React from "react";
import ModalPopup from "./ModalPopup";
import {Typography} from "antd";

const {Text} = Typography

export default function ({
    visible,
    handleOk,
    handleCancel,
    children
}) {
    return <ModalPopup
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        type={'warning'}
        closable={true}
        submitButtonText={"Delete"}
        showTitleIcon={true}
        showCancel={true}
        disableScreenTouch={true}
    >
        <h2>Are you sure?</h2>
        <Text type="danger">Deletion of the item is irreversible.</Text>
        {children}
    </ModalPopup>
}
