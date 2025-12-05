'use client';

import { useState } from 'react';
import dynamicImport from 'next/dynamic';
import { Col, Image, Row } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { REGISTER_USER } from '../../../../src/components/util/Constants.jsx';

const RegisterUser = dynamicImport(() => import('../../../../src/components/authentication/RegisterUser.jsx'), {
    ssr: false
});

const RegisterBusiness = dynamicImport(() => import('../../../../src/components/authentication/RegisterBusiness.jsx'), {
    ssr: false
});

export const dynamic = 'force-dynamic';

export default function RegistrationPage() {
    const [currentState, setCurrentState] = useState(REGISTER_USER);
    const screens = useBreakpoint();
    const secondDivsHeight = screens.md || screens.lg || screens.xl || screens.xxl ? '100vh' : '88vh';

    return (
        <Row style={registerScreenStyles.mainContainer}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}
                 style={registerScreenStyles.innerDivs}
            >
                <Image
                    style={{
                        maxHeight: '120px',
                        padding: '20px'
                    }}
                    preview={false}
                    src={'/img/GetLocals-logos/GetLocals-logos_transparent_inverse.png'}
                />
            </Col>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}
                 style={{
                     backgroundColor: 'var(--primary-color)',
                     minHeight: secondDivsHeight,
                     ...registerScreenStyles.innerDivs,
                 }}
            >
                {currentState === REGISTER_USER ?
                    <RegisterUser
                        setCurrentState={setCurrentState}
                    /> :
                    <RegisterBusiness
                        setCurrentState={setCurrentState}
                    />
                }
            </Col>
        </Row>
    );
}

const registerScreenStyles = {
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
        border: '2px solid var(--primary-background)',
        margin: '0',
    },
};
