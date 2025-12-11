'use client';

import React from 'react';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import MainNavigation from '@/components/business-admin/layout/MainNavigation';
import { WebSocketProvider } from '@/lib/context/WebSocketContext';
import '@/components/business-admin/layout/layout.css';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export default function BusinessAdminLayout({ children }) {
    const screens = useBreakpoint();
    const padding = screens.lg || screens.xl || screens.xxl ? '12%' : '0';

    return (
        <WebSocketProvider>
            <Layout style={{
                minHeight: '100vh',
            }}>
                <MainNavigation />
                <Content
                    style={{
                        background: '#fff',
                        padding: 20,
                        marginLeft: padding,
                        marginRight: padding,
                        boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)'
                    }}>
                    {children}
                </Content>
                <Footer>
                    <div style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex'
                    }}>
                        © 2024 Neo Corporation, All rights reserved.
                    </div>
                </Footer>
            </Layout>
        </WebSocketProvider>
    );
}
