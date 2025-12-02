import React, {useEffect, useState} from "react";
import {Button, Form, Select, Switch, TimePicker} from "antd";
import dayjs from "dayjs"
import {
    useGetBusinessOperationStatusQuery,
    useGetBusinessTimingsQuery, useUpdateBusinessOperationStatusMutation,
    useUpdateBusinessTimingsMutation
} from "../../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import GetLoader, {DISPLAY, SPINNERS} from "../../util/customSpinner/GetLoader";
import "./home.css"
import CustomPopover from "../../util/CustomPopover";

const TimingsForm = () => {

    const businessId = useSelector(state => state.business.businessId)
    const [updateTiming, {isLoading: updatingTiming}] = useUpdateBusinessTimingsMutation()
    const [currentData, setCurrentData] = useState({
        'monday': null,
        'tuesday': null,
        'wednesday': null,
        'thursday': null,
        'friday': null,
        'saturday': null,
        'sunday': null
    })

    const defaultTimingString = "10:00 AM - 10:00 PM";

    const {
        data: businessTimings,
        isLoading: isLoadingBusinessTimings,
        refetch: refetchTimings
    } = useGetBusinessTimingsQuery({businessId}, {skip: businessId === null});

    const {
        data: businessOperationStatus,
        isLoading: loadingBusinessOperationStatus,
        refetch: refetchOperationStatus
    } = useGetBusinessOperationStatusQuery({
        businessId: businessId,
        tomorrow: true
    }, {skip: businessId === null});

    const[
        updateBusinessOperationStatus,
        {isLoading: updatingBusinessOperationStatus}
    ] =     useUpdateBusinessOperationStatusMutation()

    const [form] = Form.useForm();
    useEffect(() => {
        if (businessTimings) {
            const data = {};
            for (const [key, value] of Object.entries(businessTimings)) {
                if (value) {
                    if (value === "CLOSED") {
                        data[key] = null;
                    } else {
                        data[key] = value.split("-").map(timeString => dayjs(timeString, 'hh:mm A'));
                    }
                } else {
                    data[key] = defaultTimingString.split("-").map(timeString => dayjs(timeString, 'hh:mm A'));
                }
            }
            setCurrentData(data)
        }
    }, [businessTimings])

    useEffect(() => {
        if (businessId) {
            refetchTimings()
            refetchOperationStatus();
        }
    }, [businessId])


    function getFormattedTime(time) {
        let hours = time.hour();
        const minutes = time.minute();
        let ampm = hours < 12 ? "AM" : "PM";
        if (hours === 0) {
            ampm = "AM";
            hours = 12;
        }
        hours = hours > 12 ? hours % 12 : hours;
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    }

    const handleSubmitTime = () => {
        const updatedTiming = {};
        let proceed = true;

        for (const [key, value] of Object.entries(currentData)) {
            if (value) {
                updatedTiming[key] = handleGetFormattedTime(value);
            } else {
                if (!key.includes("switch")) {
                    if (form.getFieldValue`${key}_switch`) {
                        proceed = false;
                        form.setFields([{
                            name: key,
                            errors: ["Please select a time range"]
                        }]);
                    } else {
                        updatedTiming[key] = 'CLOSED'
                    }
                }
            }
        }
        if (proceed) {
            updateTiming({
                businessId: businessId,
                timings: updatedTiming
            })
        }
    };

    const handleGetFormattedTime = (value) => {
        let from = "";
        let to = "";

        if (value && value.length === 2) {
            if (value[0] !== null) {
                from = getFormattedTime(value[0]);
            }
            if (value[1] !== null) {
                to = getFormattedTime(value[1]);
            }
        }
        return `${from} - ${to}`;
    };

    return (
        (isLoadingBusinessTimings) ?
            <GetLoader spinner={SPINNERS.SKELETON} display={DISPLAY.AREA}/> :
            (
                <div className={"timings-container"}>
                    <div style={{
                        marginBottom: 20
                    }}>Business operation status for tomorrow? <CustomPopover
                        content={"Only change this if tomorrow's status is different from usual. This will not affect any future timings."}/>
                        <Select
                            rootClassName={"timing-select"}
                            defaultValue={businessOperationStatus?.value}
                            disabled={updatingBusinessOperationStatus}
                            options={[{
                                label: "Open",
                                value: 'OPEN'
                            }, {
                                label: "Closed",
                                value: 'CLOSED'
                            }]}
                            style={{
                                marginLeft: 10,
                                minWidth: 150
                            }}
                            onChange={(value, option) => {
                                updateBusinessOperationStatus({businessId: businessId, status: value})
                            }}
                        />
                    </div>
                    <Form
                        style={{marginLeft: 20}}
                        form={form}
                        onFinish={handleSubmitTime}
                    >
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                            <div key={day} style={{marginBottom: 10}}>
                                <Form.Item
                                    label={`${day.charAt(0).toUpperCase() + day.slice(1)}:`}
                                    name={day}
                                    initialValue={businessTimings[day].split("-").map(timeString => dayjs(timeString, 'hh:mm A'))}
                                    style={{marginBottom: 0}}
                                >
                                    <div style={{display: 'flex', justifyContent: 'space-between', float: 'right'}}>
                                        <TimePicker.RangePicker
                                            rootClassName={'time-picker-timing'}
                                            style={{marginRight: 10}}
                                            use12Hours
                                            format="h:mm A"
                                            value={currentData[day]}
                                            defaultValue={businessTimings[day].split("-").map(timeString => dayjs(timeString, 'hh:mm A'))}
                                            disabled={currentData[day] === null}
                                            onChange={(data) => setCurrentData({
                                                ...currentData,
                                                [day]: data
                                            })}
                                        />
                                        <Form.Item
                                            style={{marginBottom: 0}}
                                            name={`${day}_switch`}
                                            valuePropName="checked"
                                        >
                                            <Switch
                                                rootClassName={"time-switch"}
                                                defaultChecked={businessTimings[day] !== 'CLOSED'}
                                                onChange={(value) => {
                                                    if (!value) {
                                                        setCurrentData({
                                                            ...currentData,
                                                            [day]: null
                                                        })
                                                    } else {
                                                        setCurrentData({
                                                            ...currentData,
                                                            [day]: defaultTimingString.split("-").map(timeString => dayjs(timeString, 'hh:mm A'))
                                                        })
                                                    }
                                                }}/>
                                        </Form.Item>
                                    </div>
                                </Form.Item>
                            </div>
                        ))}
                        <Form.Item>
                            <Button
                                style={{
                                    background: 'var(--primary-color)',
                                    filter: 'brightness(110%)',
                                    color: 'var(--primary-background)',
                                    width: 150,
                                    border: '1px solid var(--primary-color)'
                                }}
                                htmlType="submit" loading={updatingTiming}>Update</Button>
                        </Form.Item>
                    </Form>
                </div>
            )
    );
};

const Timings = ({businessId}) => {
    return (
        <div style={{marginTop: 20}}>
            <p style={{fontSize: '20px'}}>Business Timings</p>
            {businessId ?
                <TimingsForm businessId={businessId}/> :
                <GetLoader spinner={SPINNERS.SKELETON} display={DISPLAY.AREA}/>
            }
        </div>
    );
};

export default Timings;
