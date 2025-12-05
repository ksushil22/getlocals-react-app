'use client';

import React from 'react';
import { ConfigProvider } from "antd";
import { ActiveNavigationMenuProvider } from "@/lib/context/ActiveNavigationProvider";
import ReduxProvider from './ReduxProvider';
import 'animate.css/animate.compat.css';
import 'animate.css';

export default function Providers({ children }) {
    return (
        <ReduxProvider>
            <ActiveNavigationMenuProvider>
                <ConfigProvider theme={{ token: { fontFamily: 'Montserrat' } }}>
                    {children}
                </ConfigProvider>
            </ActiveNavigationMenuProvider>
        </ReduxProvider>
    );
}
