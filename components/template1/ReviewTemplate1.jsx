import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Button, Form, Input} from "antd";
import {COLORS} from "./constants";
import GetAnimation from "../util/GetAnimation";
import GetRating from "../util/GetRating";
import {useSendBusinessReviewMutation} from "@/lib/redux/services/businessAPI";
import {useSelector} from "react-redux";

const ReviewContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    background-color: white;
`

const ReviewFormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 10px 0;
`

const ReviewFormInput = styled(Input)`
    width: 500px !important;
    color: black !important;
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #a1a1a1 !important;
    max-height: 30px !important;

    &:focus {
        border: none !important;
        border-bottom: 1px solid #a1a1a1 !important;
        box-shadow: none !important;
    }
    @media (max-width: 600px) {
        width: 90vw !important;
    }    
`
const ReviewFormInputArea = styled(Input.TextArea)`
    width: 500px !important;
    color: black !important;
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #a1a1a1 !important;

    &:focus {
        border: none !important;
        border-bottom: 1px solid #a1a1a1 !important;
        box-shadow: none !important;
    }
    @media (max-width: 600px) {
        width: 90vw !important;
    }
`
const ReviewFormSubmitButton = styled(Button)`
    max-width: 250px !important;
    color: white !important;
    background-color: ${COLORS.PRIMARY_COLOR} !important;
    border-radius: 5px !important;
    border: 1px solid #a1a1a1 !important;
    transition: all 0.2s ease-in;
    align-content: center;

    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
`

const CenteredFormItem = styled(Form.Item)`
    display: flex;
    justify-content: center;
`
const ReviewTemplate1 = ({}) => {
    const[sendReview,
        {data: review, isLoading: sendingReview}] = useSendBusinessReviewMutation()

    const [rating, setRating] = useState(0);
    const [form] = Form.useForm();
    const businessId = useSelector((state) => state.templateBusiness.businessId);


    useEffect(() => {
        if (rating) {
            form.setFieldValue('rating', rating)
        }
    }, [rating])
    const rules = [{
        required: true,
        message: 'The field is required.'
    }]

    function finalizeReview() {
        sendReview({businessId: businessId, review: form.getFieldsValue()}).then(({data, error}) => {
            if (data) {
               form.resetFields();
            }
        })
    }

    return <ReviewContainer
        id={'review'}>
        <GetAnimation
            animateIn={"fadeInDown"}
            duration={1}>
            <p style={{
                textAlign: 'center',
                fontSize: 'xxx-large',
                fontWeight: 'bolder'
            }}>Review</p>
            <ReviewFormContainer
                onFinish={finalizeReview}
                form={form}>
                <CenteredFormItem
                    rules={rules}
                    name={"rating"}>
                    <GetRating
                        onSelect={setRating}
                        readOnly={false}
                        initialRating={0}
                        color={"#ffe234"}
                    />
                </CenteredFormItem>
                <Form.Item
                    rules={rules}
                    name={"fullName"}>
                    <ReviewFormInput placeholder={"Full Name"}/>
                </Form.Item>
                <Form.Item
                    name={"email"}>
                    <ReviewFormInput placeholder={"Email Address"}/>
                </Form.Item>
                <Form.Item
                    name={"phone"}>
                    <ReviewFormInput placeholder={"Phone Number"}/>
                </Form.Item>
                <Form.Item
                    name={"employeeName"}>
                    <ReviewFormInput placeholder={"Employee's Name"}/>
                </Form.Item>
                <Form.Item
                    name={"comment"}>
                    <ReviewFormInputArea placeholder={"Comment"}/>
                </Form.Item>
                <CenteredFormItem>
                    <ReviewFormSubmitButton
                        htmlType={'submit'}
                        loading={false}>Submit</ReviewFormSubmitButton>
                </CenteredFormItem>
            </ReviewFormContainer>
        </GetAnimation>
    </ReviewContainer>
}

export default ReviewTemplate1;
