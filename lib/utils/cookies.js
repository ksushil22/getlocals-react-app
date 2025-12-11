import { cookies } from 'next/headers';

/**
 * Get business information from cookies for a specific business
 * Can only be used in Server Components, Route Handlers, or Server Actions
 * @param {string} slug - The business slug/username
 * @returns {Object} Object containing businessId and templateId
 */
export function getBusinessCookies(slug) {
    if (!slug) {
        return { businessId: null, templateId: null };
    }
    
    const cookieStore = cookies();
    const businessIdCookieName = `businessId_${slug}`;
    const templateIdCookieName = `templateId_${slug}`;
    
    const businessId = cookieStore.get(businessIdCookieName)?.value;
    const templateId = cookieStore.get(templateIdCookieName)?.value;
    
    return {
        businessId,
        templateId
    };
}

/**
 * Clear all business cookies (for cleanup/logout)
 * Removes all cookies that match the business cookie pattern
 */
export function clearAllBusinessCookies() {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    
    // Remove all cookies that start with businessId_ or templateId_
    allCookies.forEach(cookie => {
        if (cookie.name.startsWith('businessId_') || cookie.name.startsWith('templateId_')) {
            cookieStore.delete(cookie.name);
        }
    });
}
