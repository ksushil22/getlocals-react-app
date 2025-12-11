export default function robots({ params }) {
    const baseUrl = `https://${params.slug}.${process.env.NEXT_PUBLIC_DOMAIN || 'getlocals.ca'}`;
    
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/business-admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}