import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {useRegisterMutation} from "../../redux/services/authAPI";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./authentication.css";
import {setCredentials} from "../../redux/slicers/authSlicer";
import {REGISTER_BUSINESS} from "../util/Constants";

export default function ({
                             setCurrentState,
                         }) {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const rules = [{
        required: true,
        message: 'The field is required.'
    }]
    const [password, setPassword] = useState('');
    const [uppercaseValid, setUppercaseValid] = useState(false);
    const [lowercaseValid, setLowercaseValid] = useState(false);
    const [numberValid, setNumberValid] = useState(false);
    const [specialCharValid, setSpecialCharValid] = useState(false);
    const [lengthValid, setLengthValid] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setUppercaseValid(/[A-Z]/.test(value));
        setLowercaseValid(/[a-z]/.test(value));
        setNumberValid(/[0-9]/.test(value));
        setSpecialCharValid(/[@#$%^&+=_]/.test(value));
        setLengthValid(value.length >= 8);
        form.setFieldValue('password', value)
        setIsEditingPassword(true);
    };

    const [
        registerUser,
        {isLoading: isRegisteringUser}
    ] = useRegisterMutation()

    function onFinish() {
        if (!(uppercaseValid && lowercaseValid && numberValid && specialCharValid && lengthValid)) {
            form.setFields([{
                name: "password",
                errors: ["Password should adhere to the above rules."]
            }])
            return;
        }
        if (form.getFieldValue('password') !== form.getFieldValue('confirmPassword')) {
            form.setFields([
                {
                    name: "confirmPassword",
                    errors: ["Passwords do not match"]
                }
            ]);
            return ;
        }

        registerUser(form.getFieldsValue()).then(({data, error})=> {
            if (data) {
                dispatch(setCredentials({...data, username: form.getFieldValue('email')}))
                setCurrentState(REGISTER_BUSINESS)
            }
        })


    }

    return (
        <div style={registerUserStyles.container}>
            <h1 style={{
                fontWeight: '900',
                fontSize: '50px',
                textShadow: '0 2px 5px'
            }}>Welcome!!</h1>
            <p style={{
                fontSize: 'x-large',
            }}>We need a few details to get started.</p>
            <Form
                form={form}
                layout={"vertical"}
                onFinish={onFinish}
            >
                <Form.Item
                    name={'name'}
                    rules={rules}
                    validateTrigger="onBlur"
                >
                    <div className={'hover-input'}>
                        <Input rootClassName={"authentication"} placeholder={'Full name'} />
                    </div>

                </Form.Item>
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
                    rules={rules}
                    validateTrigger="onBlur"
                    name={'password'} >
                    <div className={'hover-input'}>
                        <Input.Password
                            rootClassName={"authentication"}
                            onChange={handlePasswordChange}
                            visibilityToggle={false}
                            placeholder={'Password'} />
                    </div>
                    <div
                        className={`expandable-element ${isEditingPassword && (!uppercaseValid || !lowercaseValid || !numberValid || !specialCharValid || !lengthValid) ? 'expanded' : ''}`}>
                        <p style={{
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            color: uppercaseValid ? '#a49e9d' : '#6b6766',
                            textAlign: 'left',
                            paddingLeft: 20
                        }}><b>-</b> Must contain at least one uppercase letter</p>
                        <p style={{
                            margin: 0,
                            color: lowercaseValid ? '#a49e9d' : '#6b6766',
                            textAlign: 'left',
                            paddingLeft: 20
                        }}><b>-</b> Must contain at least one lowercase letter</p>
                        <p style={{
                            margin: 0,
                            color: numberValid ? '#a49e9d' : '#6b6766',
                            textAlign: 'left',
                            paddingLeft: 20
                        }}><b>-</b> Must contain at least one number</p>
                        <p style={{
                            margin: 0,
                            color: specialCharValid ? '#a49e9d' : '#6b6766',
                            textAlign: 'left',
                            paddingLeft: 20
                        }}><b>-</b> Must contain at least one special character</p>
                        <p style={{
                            margin: 0,
                            color: lengthValid ? '#a49e9d' : '#6b6766',
                            textAlign: 'left',
                            paddingLeft: 20
                        }}><b>-</b> Must be at least 8 characters long</p>
                    </div>

                </Form.Item>
                <Form.Item
                    validateTrigger="onBlur"
                    name={'confirmPassword'} rules={rules}>
                    <div className={'hover-input'}>
                        <Input
                            rootClassName={"authentication"}
                            placeholder={'Confirm Password'} />
                    </div>
                </Form.Item>
                <p style={{cursor: 'pointer', color: '#ece7e2'}} onClick={()=> navigate('/authenticate')}>Already registered? Click here to LogIn</p>
                <Form.Item>
                    <Button
                        style={{
                            ...registerUserStyles.buttons,
                            color: '#ece7e2',
                            textShadow: '0 1px 3px'
                        }}
                        loading={isRegisteringUser}
                        htmlType={'submit'}
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}

const registerUserStyles = {
    container: {
        color: '#ece7e2',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px'
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
