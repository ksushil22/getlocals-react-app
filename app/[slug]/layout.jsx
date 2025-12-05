'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout } from 'antd';
import Template1NavBar from '@/components/template1/layout/Template1NavBar';
import BusinessContactInformation from '@/components/template1/layout/BusinessContactInformation';
import { StyledContent, StyledFooter } from '@/components/template1/constants.js';
import Template1Footer from '@/components/template1/layout/Template1Footer';

// UUID pattern check (template IDs are UUIDs)
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function SlugLayout({ children }) {
    const params = useParams();
    const slug = params.slug;
    const isUUID = UUID_PATTERN.test(slug);
    
    // Only apply template layout if it's a UUID (template route)
    if (!isUUID) {
        return <>{children}</>;
    }
    
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Layout style={{
            minHeight: '100vh',
            backgroundColor: 'white'
        }}>
            <BusinessContactInformation />
            <Template1NavBar />
            <StyledContent>
                {children}
            </StyledContent>
            <StyledFooter>
                <Template1Footer />
            </StyledFooter>
            <div onClick={handleBackToTop} style={{
                position: 'fixed',
                top: '90%',
                right: '2%',
                background: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                color: '#676767',
                padding: 10,
                cursor: 'pointer',
                borderRadius: 5,
                visibility: showBackToTop ? 'visible' : 'hidden',
                opacity: showBackToTop ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}>
                &#x2191; Back to top
            </div>
        </Layout>
    );
}

