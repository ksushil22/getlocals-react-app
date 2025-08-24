import React, {useEffect} from 'react'
import {Button, Form, Input, Row} from "antd";
import "./home.css"
import {useGetContactInformationQuery, useUpdateContactInformationMutation} from "../../../redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";

const ContactInformation = ({businessId}) => {
    const [form] = Form.useForm();

    const {data: contactInformation,
        isLoading: loadingContactInformation,
        refetch: refetchContactInformation
    } = useGetContactInformationQuery({businessId}, {skip: businessId===null})

    const [updateContactInformation, {
        isLoading: updatingContactInformation
    }] = useUpdateContactInformationMutation()

    useEffect(() => {
        if (businessId) {
            refetchContactInformation();
        }
    }, [businessId, refetchContactInformation])

    function updateInformation() {
        updateContactInformation({
            businessId: businessId,
            contactInformation: form.getFieldsValue()
        });
    }

    if (loadingContactInformation) {
        return <GetLoader spinner={SPINNERS.SKELETON} display={DISPLAY.AREA} />
    }

    return(
    <div>
        <p style={{fontSize: '20px'}}>Business Contact Information</p>
        <Form
            onFinish={updateInformation}
            form={form}>
            <Form.Item
                initialValue={contactInformation?.email}
                rules={[
                    {
                        type: "email",
                        message: "Invalid email address format."
                    }
                ]}
                validateTrigger="onBlur"
                name={"email"}>
                <Input rootClassName={"contact-input"} placeholder={"Email"}/>
            </Form.Item>
            <Form.Item
                initialValue={contactInformation?.phone1}
                name={"phone1"}>
                <Input rootClassName={"contact-input"} placeholder={"Phone number"}/>
            </Form.Item>
            <Form.Item
                initialValue={contactInformation?.phone2}
                name={"phone2"}>
                <Input rootClassName={"contact-input"} placeholder={"Phone number"}/>
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        type: "url",
                        message: "Invalid URL"
                    }
                ]}
                initialValue={contactInformation?.instagramUrl}
                validateTrigger="onBlur"
                name={"instagramUrl"}>
                <Input rootClassName={"contact-input"} placeholder={"Instagram"}/>
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        type: "url",
                        message: "Invalid URL"
                    }
                ]}
                initialValue={contactInformation?.facebookUrl}
                validateTrigger="onBlur"
                name={"facebookUrl"}>
                <Input rootClassName={"contact-input"} placeholder={"Facebook"}/>
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        type: "url",
                        message: "Invalid URL"
                    }
                ]}
                validateTrigger="onBlur"
                initialValue={contactInformation?.youtubeUrl}
                name={"youtubeUrl"}>
                <Input rootClassName={"contact-input"} placeholder={"Youtube"}/>
            </Form.Item>
            <Form.Item>
                <Button
                    loading={updatingContactInformation}
                    htmlType={'submit'}
                    style={{
                    background: 'var(--primary-color)',
                    filter: 'brightness(110%)',
                    color: 'var(--primary-background)',
                    width: 150,
                    border: '1px solid var(--primary-color)'
                }}>Update</Button>
            </Form.Item>
        </Form>
    </div>)
}

export default ContactInformation;
