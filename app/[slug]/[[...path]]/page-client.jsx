'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import GetLoader, { DISPLAY, SPINNERS } from '@/components/util/customSpinner/GetLoader';
import { useGetTemplateInformationQuery } from '@/lib/redux/services/businessAPI';
import { setCurrentTemplateBusiness, setTemplateId } from '@/lib/redux/slicers/templateBusinessSlicer';
import { templateInfo } from '@/components/util/TemplateIdConstants';
import { setBusinessCookies } from './actions';

export default function ClientSlugPage({ params, initialBusinessData }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const slug = params.slug;
    const path = params.path || [];
    // Treat empty path as 'home' - no redirect needed
    const route = path[0] || 'home';
    
    // Use a ref to track if we've already set cookies to prevent infinite loops
    const cookiesSetRef = useRef(false);
    
    // Get stored template information from Redux
    const businessId = useSelector((state) => state.templateBusiness.businessId);
    const templateId = useSelector((state) => state.templateBusiness.templateId);
    
    // Use initial data from server or fetch client-side if needed
    const { data: templateInformation, error, isLoading } = useGetTemplateInformationQuery(
        { businessUsername: slug },
        { 
            skip: !slug || !!initialBusinessData, // Skip if we have initial data from server
        }
    );

    // Use server data if available, otherwise use client-fetched data
    const businessData = initialBusinessData || templateInformation;

    useEffect(() => {
        if (businessData && !cookiesSetRef.current) {
            // Store both business ID and template ID in Redux for client-side usage
            dispatch(setCurrentTemplateBusiness({ 
                id: businessData?.id,
                templateId: businessData?.templateId 
            }));
            
            // Set cookies via server action with business-specific names
            // Mark as set BEFORE calling to prevent race conditions
            cookiesSetRef.current = true;
            setBusinessCookies(slug, businessData?.id, businessData?.templateId);
        }
    }, [businessData, dispatch, slug]);

    // Handle loading state only if we don't have initial data
    if (!initialBusinessData && isLoading) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />;
    }

    // Handle error state
    if (error && !initialBusinessData) {
        router.push('/error');
        return null;
    }

    // Wait for template information to be loaded
    if (!templateId || !businessId) {
        // If we're still waiting for Redux to be populated
        if (businessData) {
            return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />;
        }
        return null;
    }

    // Get the template configuration based on templateId
    const template = templateInfo[templateId];
    
    if (!template) {
        console.error(`Template not found for ID: ${templateId}`);
        router.push('/error');
        return null;
    }

    // Get the layout and page component
    const Layout = template.layout;
    const Component = template[route];
    
    // Routes that should NOT have a layout (standalone pages)
    const noLayoutRoutes = ['order-status'];
    
    if (Component) {
        // Check if this route should skip the layout
        if (noLayoutRoutes.includes(route)) {
            return <Component businessId={businessId} />;
        }
        
        // If template has a layout, wrap the component with it
        if (Layout) {
            return (
                <Layout>
                    <Component businessId={businessId} />
                </Layout>
            );
        }
        // Otherwise just render the component
        return <Component businessId={businessId} />;
    }

    // If route doesn't exist in template, redirect to root (home)
    router.replace(`/${slug}`);
    return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />;
}

