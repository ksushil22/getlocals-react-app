import { notFound } from 'next/navigation';
import ClientSlugPage from './page-client';
import { seoConfig } from '@/lib/seo/config';
import { fetchTenantInformation } from '@/lib/redux/services/tenantInformation';
import { isReservedPath } from '@/lib/constants/routes';

// Server component for SEO and initial data fetching
async function getBusinessData(slug) {
    // Don't fetch for reserved paths
    if (isReservedPath(slug)) {
        return null;
    }
    
    try {
        const response = await fetchTenantInformation(slug);
        return response;
    } catch (error) {
        console.error('Error fetching business data via Redux API:', error);
        return null;
    }
}

export default async function SlugPage({ params }) {
    // If the slug is a reserved path, return 404
    if (isReservedPath(params.slug)) {
        notFound();
    }
    
    const businessData = await getBusinessData(params.slug);
    
    if (!businessData) {
        notFound();
    }
    
    // Determine page type from path
    const pageType = params.path?.[0] || 'home';
    
    // Add URL to business data
    const enrichedBusinessData = {
        ...businessData,
        url: `https://${params.slug}.${process.env.NEXT_PUBLIC_DOMAIN || 'getlocals.ca'}`,
    };
    
    // Generate structured data for SEO using the centralized config
    const structuredData = seoConfig.generateStructuredData(enrichedBusinessData, pageType);
    
    return (
        <>
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            
            {/* Client Component with initial data */}
            <ClientSlugPage 
                params={params}
                initialBusinessData={businessData}
            />
        </>
    );
}