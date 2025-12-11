// SEO configuration for template-based websites
export const seoConfig = {
    // Default values for all pages
    defaults: {
        titleTemplate: '%s | GetLocals',
        defaultTitle: 'GetLocals - Local Business Directory',
        description: 'Discover and support local businesses in your area',
        keywords: 'local business, restaurant, food, menu, order online, delivery',
        openGraph: {
            type: 'website',
            locale: 'en_US',
            site_name: 'GetLocals',
        },
        twitter: {
            card: 'summary_large_image',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    },
    
    // Page-specific configurations
    pages: {
        home: {
            title: 'Home',
            description: 'Welcome to our business. Discover our products and services.',
            priority: 1.0,
            changeFrequency: 'weekly',
        },
        menu: {
            title: 'Menu',
            description: 'Browse our menu and order online for pickup or delivery.',
            priority: 0.9,
            changeFrequency: 'daily',
        },
        about: {
            title: 'About Us',
            description: 'Learn more about our story, mission, and values.',
            priority: 0.7,
            changeFrequency: 'monthly',
        },
        contact: {
            title: 'Contact',
            description: 'Get in touch with us. Find our location, hours, and contact information.',
            priority: 0.8,
            changeFrequency: 'monthly',
        },
    },
    
    // Generate structured data for different business types
    generateStructuredData(businessData, pageType = 'home') {
        const baseData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": businessData.businessName,
            "description": businessData.description,
            "url": businessData.url,
            "telephone": businessData.phone,
            "email": businessData.email,
            "image": businessData.logoUrl,
            "priceRange": businessData.priceRange || "$$",
        };
        
        if (businessData.address) {
            baseData.address = {
                "@type": "PostalAddress",
                "streetAddress": businessData.address.street,
                "addressLocality": businessData.address.city,
                "addressRegion": businessData.address.state,
                "postalCode": businessData.address.postalCode,
                "addressCountry": businessData.address.country || "US",
            };
        }
        
        if (businessData.hours) {
            baseData.openingHoursSpecification = businessData.hours.map(hour => ({
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": hour.day,
                "opens": hour.open,
                "closes": hour.close,
            }));
        }
        
        if (businessData.rating) {
            baseData.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": businessData.rating.value,
                "reviewCount": businessData.rating.count,
            };
        }
        
        // Add menu-specific data
        if (pageType === 'menu' && businessData.menu) {
            baseData.hasMenu = {
                "@type": "Menu",
                "name": "Menu",
                "description": "Our complete menu",
                "hasMenuSection": businessData.menu.sections?.map(section => ({
                    "@type": "MenuSection",
                    "name": section.name,
                    "description": section.description,
                    "hasMenuItem": section.items?.map(item => ({
                        "@type": "MenuItem",
                        "name": item.name,
                        "description": item.description,
                        "offers": {
                            "@type": "Offer",
                            "price": item.price,
                            "priceCurrency": "USD",
                        },
                    })),
                })),
            };
        }
        
        return baseData;
    },
};