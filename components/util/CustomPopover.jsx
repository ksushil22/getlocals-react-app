import React from "react";
import {Popover} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export default function ({content, icon=<InfoCircleOutlined style={{
    cursor: 'help',
    fontSize: 'small',
    paddingTop: 0
}}/>}) {

    const screens = useBreakpoint();

    const placement = screens.md || screens.lg || screens.xl || screens.xxl ? 'right' : 'top';
    return <Popover content={content} placement={placement} >
        {icon}
    </Popover>
}
