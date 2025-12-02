import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateBusinessItemCategoryMutation, useGetBusinessItemCategoriesQuery } from "../../../redux/services/businessAPI";
import GetLoader, { DISPLAY } from "../../util/customSpinner/GetLoader";
import {Button, Empty, Form, Input, Row, Tabs} from "antd";
import './businessMenu.css'
import BusinessHeading from "../../util/BusinessHeading";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NoDataGIF from "../../util/NoDataGIF";

// Lazy load components for each tab
const LazyTabContent = React.lazy(() => import('./MenuList'));

export default function BusinessMenu({editing}) {
    const businessId = useSelector((state) => state.business.businessId);
    const [activeKey, setActiveKey] = useState('0');
    const [tabContent, setTabContent] = useState({});
    const [items, setItems] = useState([]);

    const { data: categories, isLoading: loadingBusinessCategories } = useGetBusinessItemCategoriesQuery(businessId);
    const [createCategoryMutation, { isLoading: isCreatingCatefory }] = useCreateBusinessItemCategoryMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (categories) {
            const initialTabContent = {};
            categories.forEach(category => {
                initialTabContent[category.id] = null;
            });
            setTabContent(initialTabContent);
            setItems(categories.map(category => ({
                key: category.id,
                label: category.name,
                children: getChildren(category.id)
            })));
            setActiveKey(categories[0]?.id || '0');
        }
    }, [categories]);

    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };

    const getChildren = (id) => {
        if (!tabContent[id]) {
            return (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <LazyTabContent categoryId={id} editing={editing}/>
                </React.Suspense>
            );
        } else {
            return tabContent[id];
        }
    };

    if (loadingBusinessCategories) {
        return <GetLoader display={DISPLAY.FULLSCREEN} />;
    }

    function createCategory() {
        const category = form.getFieldValue("category");
        if (category) {
            createCategoryMutation({ businessId, category });
            form.resetFields();
        }
    }

    const getCreateCategoriesForm = (
        <Form onFinish={createCategory} form={form} layout={"inline"}>
            <Form.Item name={"category"}>
                <Input autoComplete={"off"} rootClassName={"input-menu"} placeholder={"Category"} />
            </Form.Item>
            <Form.Item>
                <Button
                    loading={isCreatingCatefory}
                    htmlType={'submit'}
                    style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: 'black',
                        background: 'none',
                        borderRadius: '5px',
                        border: 'none',
                        boxShadow: '0 5px 10px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19)'
                    }}
                >
                    Create
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <Row>
            <BusinessHeading heading={"Menu Items"} />
            <div style={{width: '100%', marginTop: 20}}>
                {categories && categories.length > 0 ?

                    <Tabs
                        rootClassName={"item-tab"}
                        onChange={onChange}
                        activeKey={activeKey}
                        tabBarStyle={{border: 'none'}}
                        tabBarExtraContent={editing ? getCreateCategoriesForm : null}
                        items={items}/>
                     :
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            marginTop: 20,
                            marginLeft: 'auto'
                        }}>
                            {getCreateCategoriesForm}
                        </div>

                        <NoDataGIF message={"No Category created"} />
                    </div>

                }
            </div>

        </Row>
    );
}
