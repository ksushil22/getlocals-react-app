'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useValidateTokenQuery } from '../../lib/redux/services/authAPI.js';
import GetLoader from '../../src/components/util/customSpinner/GetLoader.jsx';

export default function ProtectedLayout({ children }) {
    const router = useRouter();
    
    // Check authentication
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('access') : null;
    
    const { data: isValidToken, isLoading, error } = useValidateTokenQuery(token || '', {
        skip: !token
    });
    
    useEffect(() => {
        if (!isLoading && !token) {
            // No token, redirect to login
            router.push('/authenticate');
        } else if (!isLoading && token && error) {
            // Token invalid, redirect to login
            router.push('/authenticate');
        }
    }, [isLoading, token, error, router]);
    
    if (isLoading) {
        return <GetLoader />;
    }
    
    if (!token || error) {
        return <GetLoader />; // Will redirect
    }
    
    if (!isValidToken && token) {
        return <GetLoader />; // Will redirect
    }
    
    // Authenticated, show protected content
    return <>{children}</>;
}
