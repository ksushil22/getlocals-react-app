import React from "react";
import {Button, Col, Form, Image, Input, Row} from "antd";
import {useLoginMutation} from "../../redux/services/authAPI";
import {setCredentials} from "../../redux/slicers/authSlicer";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import "./authentication.css";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function () {
    const [loginMutation, {isLoading: isLoggingInUser}] = useLoginMutation();
    const dispatch = useDispatch();
    const location = useLocation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const innerDivHeight = screens.md || screens.lg || screens.xl || screens.xxl ? '100vh' : '100%';

    const onFinish = async () => {
        try {
            loginMutation(form.getFieldsValue()).then(({data, error}) => {
                if (data) {
                    dispatch(setCredentials({...data, username: form.getFieldValue("email")}));

                    const {from} = location.state || {from: {pathname: "/business-admin/home"}};
                    navigate(from);
                }
            })

        } catch (err) {
            console.error(err)
        }
    };

    const rules = [{
        required: true,
        message: 'The field is required.'
    }]

    return (
        <Row style={loginStyle.mainContainer}>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}
                 style={{
                     ...loginStyle.innerDivs,
                     backgroundColor: 'var(--primary-color)',
                     color: '#ece7e2', minHeight: innerDivHeight,
                     border: '2px solid var(--primary-background)'
                 }}
            >
                <Image
                    style={{
                        maxHeight: '120px',
                        padding: '20px',
                        width: 'auto',
                    }}
                    preview={false} src={require('../../assets/img/GetLocals-logos/GetLocals-logos_transparent.png')}/>
                <h1 style={{
                    fontWeight: '900',
                    fontSize: '50px',
                    textShadow: '0 2px 5px'
                }}>Sign In to your Account</h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout={'vertical'}
                >
                    <Form.Item
                        validateTrigger="onBlur"
                        name={'email'} rules={[
                        {
                            required: true,
                            message: 'The field is required.'
                        },
                        {
                            type: "email",
                            message: "Invalid email address format."
                        }
                    ]}>
                        <div className={'hover-input'}>
                            <Input rootClassName={"authentication"} placeholder={'Email'}/>
                        </div>
                    </Form.Item>
                    <Form.Item
                        validateTrigger="onBlur"
                        name={'password'} rules={rules}>
                        <div className={'hover-input'}>
                            <Input.Password
                                rootClassName={"authentication"}
                                visibilityToggle={false}
                                placeholder={'Password'}/>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{
                                ...loginStyle.buttons,
                                color: '#ece7e2',
                            }}
                            htmlType={'submit'}
                            loading={isLoggingInUser}
                        >
                            LogIn <FontAwesomeIcon icon={faArrowRightToBracket} style={{paddingLeft: '10px'}}/></Button>
                    </Form.Item>
                </Form>

            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}
                 style={{...loginStyle.innerDivs, color: 'var(--primary-color)', minHeight: innerDivHeight}}
            >
                <h1 style={{
                    fontWeight: '900',
                    fontSize: '50px',
                    color: 'var(--primary-color)',
                    textShadow: '0 2px 5px'
                }}>New Here?</h1>
                <p style={{
                    fontWeight: 'bold',
                    fontSize: 'larger',
                    color: 'var(--primary-color)'
                }}>You are just one step away...</p>
                <Button
                    style={{
                        ...loginStyle.buttons,
                        color: 'var(--primary-color)',
                        marginTop: '20px',
                        textShadow: '0 1px 3px'
                    }}
                    onClick={() => navigate('/authenticate/registration')}>
                    Register
                </Button>

            </Col>

        </Row>
    )

}

const loginStyle = {
    mainContainer: {
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    innerDivs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '0',
        padding: '20px'
    },
    buttons: {
        width: '240px',
        height: '50px',
        borderRadius: '10px',
        fontWeight: 'bolder',
        fontSize: '25px',
        background: 'none',
        border: 'none',
        boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)'

    }
}
