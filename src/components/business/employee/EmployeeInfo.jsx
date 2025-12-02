import React, {useEffect, useState} from "react";
import {Button, Form, Image, Input, List, Row, Select, Space} from "antd";
import BusinessHeading from "../../util/BusinessHeading";
import GetUpload from "../../util/upload/GetUpload";
import "./employee.css"
import {
    useCreateEmployeeInfoMutation, useDeleteEmployeeMutation,
    useGetEmployeesQuery,
    useUpdateEmployeeInfoMutation
} from "../../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import NoDataGIF from "../../util/NoDataGIF";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDeleteLeft, faEdit, faPhone, faReply} from "@fortawesome/free-solid-svg-icons";
import {PUBLIC_BUSINESS_API} from "../../../redux/api_url";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import DeleteConfirmationModal from "../../util/modals/DeleteConfirmationModal";

const BASE_URL = process.env.BASE_API_URL;

function EmployeeCard({item, businessId, setupUpdateItem, setUpdateId, setModalVisible}) {

    return <List.Item
        className={"item-card"}
        colStyle={{
            border: '1px solid red'
        }}
        actions={[
            <Space
                style={{
                    cursor: 'pointer'
                }}
                title={item.email}
                onClick={() => {
                    setupUpdateItem(item)
                }}>
                <FontAwesomeIcon icon={faEdit} /> Edit
            </Space>,
            <Space
                style={{
                    cursor: 'pointer'
                }}
                title={item.email}
                onClick={() => {
                    setUpdateId(item.id)
                    setModalVisible(true)
                }}>
                <FontAwesomeIcon icon={faDeleteLeft} /> Delete
            </Space>,
        ]}
        extra={
        item.imageId && (
            <Image
                alt={item.firstName}
                src={`${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${item.imageId}/`}
                style={{
                    borderRadius: '5px',
                    width: 150,
                    height: 150,
                    objectFit: 'contain'
                }}
                loading={"lazy"}
            />)}
        key={item.id}
    >
        <List.Item.Meta
            title={`${item.firstName || ''} ${item.lastName || ''}`}
            description={<p style={{marginLeft: 10}}>
                <span>{item?.position}<br/>
                {item?.email}<br />
                {item?.phoneNo}</span>
        </p>}

        />
        <p>{item.description}</p>
    </List.Item>
}

const EmployeeInfo = () => {
    const businessId = useSelector((state) => state.business.businessId);
    const [initialImageList, setInitialImageList] = useState([]);
    const [form] = Form.useForm();
    const [isUpdating, setIsUpdating] = useState(false)
    const [updateId, setUpdateId] = useState(null)
    const [deleteEmployeeModalVisible, setDeleteEmployeeModalVisible] = useState(false)

    const screens = useBreakpoint();
    const cancelButtonTopMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 0 : 20;
    const cancelButtonLeftMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 20 : 0;

    const {
        data: employeeList,
        isLoading: loadingEmployeeList,
        error: errorLoadingEmployee
    } = useGetEmployeesQuery({businessId});
    const [deleteEmployee, {isLoading: idDeletingEmployee}] = useDeleteEmployeeMutation();

    const EmployeeForm = () => {
        const [imageId, setImageId] = useState(null)
        const [createEmployee, {isLoading: creatingEmployee}] = useCreateEmployeeInfoMutation()
        const [updateEmployeeInfo, {isLoading: updatingEmployee}] = useUpdateEmployeeInfoMutation()
        const rules = [{
            required: true,
            message: 'This is a required field.'
        }]

        useEffect(() => {
            form.setFieldValue("imageId", imageId)
        }, [imageId]);

        function submitEmployeeInfo() {
            if (isUpdating) {
                updateEmployeeInfo({
                    businessId,
                    'employeeDTO': {
                        ...form.getFieldsValue(),
                        'id': updateId
                    }
                })
                form.resetFields();
                resetUpdateItems();
            } else{
                createEmployee({businessId, 'employeeDTO': form.getFieldsValue()});
                form.resetFields();
            }

        }

        return (
            <Form
                rootClassName={"employee-form-div"}
                form={form}
                onFinish={submitEmployeeInfo}
                layout={"vertical"}
            >
                <Form.Item
                    name={"imageId"}
                >
                    <GetUpload
                        type={"EMPLOYEE"}
                        accept="image/png, image/jpeg"
                        updateInitialList={true}
                        maxUploads={1}
                        initialFileList={initialImageList}
                        setUploadImageId={setImageId} />
                </Form.Item>
                <Form.Item
                    name={"firstName"}
                    rules={rules}
                    validateTrigger="onBlur"
                >
                    <Input placeholder={"Fist Name"} />
                </Form.Item>
                <Form.Item
                    rules={rules}
                    name={"lastName"}
                    validateTrigger="onBlur"
                >
                    <Input placeholder={"Last Name"} />
                </Form.Item>
                <Form.Item
                    name={"description"}
                >
                    <Input placeholder={"Tell us about them"} />
                </Form.Item>
                <Form.Item
                    name={"email"}
                    rules={[{
                        type: 'email',
                        message: 'Invalid email format'
                    }]}
                    validateTrigger="onBlur"
                >
                    <Input placeholder={"Email"} />
                </Form.Item>
                <Form.Item
                    name={"phoneNo"}
                >
                    <Input placeholder={"Mobile number"}/>
                </Form.Item>
                <Form.Item

                    initialValue={"Choose from options"}
                    rules={rules}
                    validateTrigger="onBlur"
                    name={"position"}>
                    <Select
                        rootClassName={"employee-select"}
                        options={[{
                            label: "OWNER",
                            value: 'OWNER'
                        }, {
                            label: "GENERAL_MANAGER",
                            value: 'GENERAL_MANAGER'
                        }, {
                            label: "DISTRICT_MANAGER",
                            value: 'DISTRICT_MANAGER'
                        }, {
                            label: "MANAGER",
                            value: 'MANAGER'
                        }, {
                            label: "EMPLOYEE",
                            value: 'EMPLOYEE'
                        }
                        ]}
                        onChange={(value, option) => {
                            form.setFieldValue("position", value)
                        }}
                    />

                </Form.Item>
                <Form.Item>
                    <Button
                        loading={creatingEmployee || updatingEmployee}
                        className={"submit-button"}
                        htmlType={"submit"}
                    >{isUpdating ? 'Update' : 'Submit'}</Button>
                    <Button
                        className={"submit-button"}
                        style={{
                            opacity: isUpdating ? 1 : 0,
                            transition: 'all 0.3s ease-in-out',
                            marginLeft: cancelButtonLeftMargin,
                            marginTop: cancelButtonTopMargin
                        }}
                        onClick={() => resetUpdateItems()}
                    >Cancel</Button>
                </Form.Item>
            </Form>)

    }

    function setupUpdateItem(item) {
        form.resetFields();
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
        setIsUpdating(true)
        if (item.imageId) {
            setInitialImageList([{
                uid: item?.imageId,
                name: item?.firstName,
                status: 'done',
                url: `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${item.imageId}/`
            }])
        } else {
            setInitialImageList([])
        }
        form.setFieldsValue(item)
        form.setFieldValue("imageId", item?.imageId)
        setUpdateId(item.id)
    }

    function resetUpdateItems() {
        form.resetFields();
        setIsUpdating(false);
        setInitialImageList([])
        setUpdateId(null)
    }

    return <div>
        <BusinessHeading heading={"Employee Info"} />
        <div className={"employee-div"} style={{
            marginTop: 20,
            width: '100%'
        }}>
            <EmployeeForm />
        </div>
        <div className={"employee-list"}>
            {loadingEmployeeList ? <GetLoader spinner={SPINNERS.SKELETON_LIST} display={DISPLAY.AREA} /> :
                <List
                    itemLayout="vertical"
                    style={{
                        width: '100%',
                        marginTop: 50
                    }}
                    size="large"
                    dataSource={employeeList}
                    renderItem={(item) => (
                        <EmployeeCard
                            item={item}
                            businessId={businessId}
                            setUpdateId={setUpdateId}
                            setupUpdateItem={setupUpdateItem}
                            setModalVisible={setDeleteEmployeeModalVisible}
                        />)}
                    locale={{
                        emptyText: <NoDataGIF message={"No Employee created."} />
                    }}
                />
            }
        </div>
        <DeleteConfirmationModal
            visible={deleteEmployeeModalVisible}
            handleOk={() => {
                deleteEmployee({businessId, employeeId: updateId}).then(({data, error}) => {
                    if (data) {
                        resetUpdateItems();
                        setDeleteEmployeeModalVisible(false)
                    } else {
                        console.error(error);
                    }
                });
            }}
            handleCancel={()=> {
                resetUpdateItems();
                setDeleteEmployeeModalVisible(false);
            }}></DeleteConfirmationModal>
    </div>
}

export default EmployeeInfo;
