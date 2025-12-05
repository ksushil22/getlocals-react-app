'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import GetLoader, { DISPLAY, SPINNERS } from '@/components/util/customSpinner/GetLoader';
import { useGetTemplateInformationQuery } from '@/lib/redux/services/businessAPI';
import { setCurrentTemplateBusiness } from '@/lib/redux/slicers/templateBusinessSlicer';
import Template1Home from '@/components/template1/Template1Home';
import Template1Menu from '@/components/template1/menu/Template1Menu';
import { useSelector } from 'react-redux';

// UUID pattern check (template IDs are UUIDs)
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function SlugPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const slug = params.slug;
    const path = params.path || [];
    
    const isUUID = UUID_PATTERN.test(slug);
    
    // If it's a UUID (template ID), render template routes
    if (isUUID) {
        const route = path[0] || 'home';
        
        if (route === 'home') {
            const businessId = useSelector((state) => state.templateBusiness.businessId);
            return <Template1Home businessId={businessId} />;
        }
        
        if (route === 'menu') {
            return <Template1Menu />;
        }
        
        // Unknown template route, redirect to home
        router.replace(`/${slug}/home`);
        return <GetLoader />;
    }
    
    // Otherwise, treat it as businessUsername and redirect
    const { data: templateInformation, error, isLoading } = useGetTemplateInformationQuery({ businessUsername: slug });

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                router.push('/error');
            } else if (templateInformation) {
                dispatch(setCurrentTemplateBusiness({ id: templateInformation?.id }));
                router.push(`/${templateInformation.templateId}/home/`);
            }
        }
    }, [isLoading, templateInformation, error, dispatch, router, slug]);

    if (isLoading) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />;
    }

    return null;
}

