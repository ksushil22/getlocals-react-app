import { fetchTenantInformation } from '@/lib/redux/services/tenantInformation';
import { isReservedPath } from '@/lib/constants/routes';

export async function generateMetadata({ params }) {
    // If the slug is a reserved path, return default metadata
    if (isReservedPath(params.slug)) {
        return {
            title: 'Page Not Found',
            description: 'The requested page could not be found.'
        };
    }
    
    // Use lightweight tenant information for metadata instead of full business info
    // This avoids an extra API call
    try {
        const tenantInfo = await fetchTenantInformation(params.slug);
        
        if (!tenantInfo) {
            return {
                title: 'Business Not Found',
                description: 'The requested business page could not be found.'
            };
        }
        
        const pagePath = params.path?.[0] || 'home';
        const pageTitle = pagePath.charAt(0).toUpperCase() + pagePath.slice(1);
        const businessName = tenantInfo.businessName || params.slug;
        
        return {
            title: `${businessName} - ${pageTitle}`,
            description: tenantInfo.description || `Welcome to ${businessName}`,
            openGraph: {
                title: `${businessName} - ${pageTitle}`,
                description: tenantInfo.description || `Welcome to ${businessName}`,
                type: 'website',
                locale: 'en_US',
                url: `https://${params.slug}.${process.env.NEXT_PUBLIC_DOMAIN || 'getlocals.ca'}/${pagePath}`,
                siteName: businessName
            },
            twitter: {
                card: 'summary_large_image',
                title: `${businessName} - ${pageTitle}`,
                description: tenantInfo.description || `Welcome to ${businessName}`
            },
            alternates: {
                canonical: `https://${params.slug}.${process.env.NEXT_PUBLIC_DOMAIN || 'getlocals.ca'}/${pagePath}`
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1
                }
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: params.slug,
            description: `Visit ${params.slug}`
        };
    }
}

export default function SlugLayout({ children }) {
    return children;
}