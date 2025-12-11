'use server';

import { cookies } from 'next/headers';

/**
 * Server action to set business cookies
 * Stores cookies with business-specific names to support multiple businesses
 * @param {string} slug - The business slug/username
 * @param {string} businessId - The business ID
 * @param {string} templateId - The template ID
 */
export async function setBusinessCookies(slug, businessId, templateId) {
    if (!slug) return;
    
    const cookieStore = cookies();
    
    // Create unique cookie names for this business
    const businessIdCookieName = `businessId_${slug}`;
    const templateIdCookieName = `templateId_${slug}`;
    
    if (businessId) {
        cookieStore.set(businessIdCookieName, businessId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
    }
    
    if (templateId) {
        cookieStore.set(templateIdCookieName, templateId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
    }
}

/**
 * Server action to clear business cookies for a specific business
 * @param {string} slug - The business slug/username
 */
export async function clearBusinessCookies(slug) {
    if (!slug) return;
    
    const cookieStore = cookies();
    const businessIdCookieName = `businessId_${slug}`;
    const templateIdCookieName = `templateId_${slug}`;
    
    cookieStore.delete(businessIdCookieName);
    cookieStore.delete(templateIdCookieName);
}
