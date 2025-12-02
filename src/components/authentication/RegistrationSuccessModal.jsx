import React from "react";
import {Col, Divider, Modal, Row} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import ModalPopup from "../util/modals/ModalPopup";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/slicers/authSlicer";


export default function ({isVisible}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return  <ModalPopup
        visible={isVisible}
        title={'Registered...'}
        type={'success'}
        showCancel={false}
        handleCancel={() => {
            dispatch(logOut())
            navigate('/authenticate')
        }}
        disableScreenTouch={false}
    >
        <Col >
            <h1>Congratulations!</h1>
            <p style={modalStyle.paragraph}>Your new account has been created successfully!
                A confirmation email has been sent to the provided email address.
                 If you have not received it within the 24 hours, please contact us.
                 Follow the url on the email to activate your account.</p>
        </Col>
    </ModalPopup>
}


const modalStyle = {
    paragraph : {
        fontSize: 'large'
    }
}
