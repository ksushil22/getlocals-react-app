import React, { memo } from 'react';
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';

function ModalPopup(
    {
        title,
        visible,
        handleOk,
        handleCancel,
        type,
        children,
        footer,
        closable,
        style,
        submitButtonText,
        showTitleIcon=true,
        showCancel=true,
        disableScreenTouch = true,
        loading = false
    }
) {
    let icon = null;

    switch (type) {
        case "info":
            icon = <InfoCircleOutlined style={{ color: '#3c59cc' }} />;
            break;
        case "success":
            icon = <CheckCircleOutlined style={{ color: 'green' }} />;
            break;
        case "warning":
            icon = <ExclamationCircleOutlined style={{ color: 'var(--primary-warning)' }} />;
            break;
        default:
            icon = <InfoCircleOutlined style={{ color: '#3c59cc' }} />;
            break;
    }
    const customFooter = (handleOk || handleCancel || footer) ? (
        <div>
            {footer}
            {handleCancel && showCancel ?
                <Button type={"text"} onClick={handleCancel} disabled={loading}>
                    Cancel
                </Button>: null}
            {handleOk ?
                <Button type={"default"}
                        style={{
                            backgroundColor: type === "warning" ? "var(--primary-warning)" : "var(--primary-color)",
                            color: "white",
                            border: type === "warning" ? "var(--primary-warning)" : "1px solid var(--primary-color)"
                        }}
                        onClick={handleOk}
                        loading={loading}>
                    {submitButtonText ? submitButtonText : 'Submit'}
                 </Button> : null}

        </div>
    ): null



    return (
        <Modal
            title={title === null ? null :
                (<div style={modalButtonStyle.title}>
                    {showTitleIcon ? <span style={modalButtonStyle.iconStyle}>{icon}</span> : null}
                    {title}
                </div>)}
            onCancel={handleCancel}
            open={visible}
            footer={customFooter}
            maskClosable={!disableScreenTouch}
            centered={true}
            children={children}
            closable={closable}
            styles={{
                mask: {
                    backdropFilter: 'blur(1.5px)',
                },
                body: {
                    textAlign: 'center'
                },
                content:{
                    ...style,
                }
            }}
        >
        </Modal>
    );
}

export default memo(ModalPopup);

const modalButtonStyle = {
    title: {
        fontSize: '1.5em',
        textAlign: 'center',
    },
    iconStyle: {
        marginRight: '1em'
    }
};
