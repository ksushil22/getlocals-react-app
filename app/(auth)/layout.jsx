'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useValidateTokenQuery } from '../../lib/redux/services/authAPI.js';
import GetLoader from '../../src/components/util/customSpinner/GetLoader.jsx';
import { logOut } from '../../lib/redux/slicers/authSlicer.js';

export default function AuthLayout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    
    // Check if user is already authenticated
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('access') : null;
    
    const { data: isValidToken, isLoading, error } = useValidateTokenQuery(token || '', {
        skip: !token
    });
    
    useEffect(() => {
        if (!isLoading && token) {
            if (error) {
                // Token invalid, log out
                dispatch(logOut());
            } else if (isValidToken) {
                // Token valid, redirect to home
                router.push('/');
            }
        }
    }, [isLoading, isValidToken, error, token, dispatch, router]);
    
    if (isLoading && token) {
        return <GetLoader />;
    }
    
    if (isValidToken && token) {
        return <GetLoader />;
    }
    
    // No token or token invalid, show auth pages
    return <>{children}</>;
}
