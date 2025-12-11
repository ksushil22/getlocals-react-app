export default async function sitemap({ params }) {
    const baseUrl = `https://${params.slug}.${process.env.NEXT_PUBLIC_DOMAIN || 'getlocals.ca'}`;
    
    // Define the main pages for each business
    const routes = ['', '/home', '/menu'].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' || route === '/home' ? 1 : 0.8,
    }));
    
    return routes;
}