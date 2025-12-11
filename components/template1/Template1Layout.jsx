'use client';

import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Template1NavBar from './layout/Template1NavBar';
import BusinessContactInformation from './layout/BusinessContactInformation';
import { StyledContent, StyledFooter } from './constants.js';
import Template1Footer from './layout/Template1Footer';

export default function Template1Layout({ children }) {
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
        <>
            <style jsx global>{`
                * {
                    font-family: 'Montserrat', sans-serif !important;
                }
            `}</style>
            <Layout style={{
                minHeight: '100vh',
                backgroundColor: 'white',
                fontFamily: 'Montserrat, sans-serif'
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
        </>
    );
}

