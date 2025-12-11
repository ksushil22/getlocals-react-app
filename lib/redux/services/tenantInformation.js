import { businessAPI } from '@/lib/redux/services/businessAPI';
import { initializeStore } from '@/lib/redux/store';

// Cache configuration
// SHORTER TTL for development - change to 24 hours for production
const CACHE_TTL = process.env.NODE_ENV === 'development' 
    ? 5 * 60 * 1000  // 5 minutes in development
    : 24 * 60 * 60 * 1000; // 24 hours in production

const tenantInformationCache = new Map();

/**
 * Check if a cache entry has expired
 */
function isCacheExpired(timestamp) {
    return Date.now() - timestamp > CACHE_TTL;
}

/**
 * Clean up expired cache entries
 * This runs periodically to prevent memory buildup
 */
function cleanupExpiredCache() {
    const now = Date.now();
    for (const [key, value] of tenantInformationCache.entries()) {
        if (value.timestamp && now - value.timestamp > CACHE_TTL) {
            tenantInformationCache.delete(key);
            console.log(`[Cache] Cleaned up expired entry for: ${key}`);
        }
    }
}

// Run cleanup every hour
if (typeof window === 'undefined') {
    // Server-side: cleanup on each request check is sufficient
    // No interval needed as server restarts regularly
} else {
    // Client-side: periodic cleanup
    setInterval(cleanupExpiredCache, 60 * 60 * 1000); // Every hour
}

export async function fetchTenantInformation(businessUsername, options = {}) {
    if (!businessUsername) {
        throw new Error('Missing businessUsername when fetching tenant information.');
    }

    const { forceRefresh = false } = options;

    // Check if cache exists and is not expired
    if (tenantInformationCache.has(businessUsername) && !forceRefresh) {
        const cached = tenantInformationCache.get(businessUsername);
        
        // If it's a promise (currently fetching), return it
        if (cached instanceof Promise) {
            return cached;
        }
        
        // If cached data exists and is not expired, return it
        if (cached.data && !isCacheExpired(cached.timestamp)) {
            console.log(`[Cache] Using cached tenant info for: ${businessUsername}`);
            return cached.data;
        }
        
        // Cache expired, remove it
        console.log(`[Cache] Expired tenant info for: ${businessUsername}, fetching fresh data`);
        tenantInformationCache.delete(businessUsername);
    }
    
    if (forceRefresh) {
        console.log(`[Cache] Force refresh requested for: ${businessUsername}`);
        tenantInformationCache.delete(businessUsername);
    }

    const store = initializeStore();
    const fetchPromise = (async () => {
        try {
            const data = await store
                .dispatch(
                    businessAPI.endpoints.getTemplateInformation.initiate({
                        businessUsername,
                    })
                )
                .unwrap();
            
            // Store with timestamp
            tenantInformationCache.set(businessUsername, {
                data,
                timestamp: Date.now()
            });
            
            console.log(`[Cache] Cached fresh tenant info for: ${businessUsername}`);
            return data;
        } catch (error) {
            // Remove from cache on error
            tenantInformationCache.delete(businessUsername);
            throw error;
        } finally {
            store.dispatch(businessAPI.util.resetApiState());
        }
    })();
    
    // Store the promise temporarily while fetching
    tenantInformationCache.set(businessUsername, fetchPromise);
    return fetchPromise;
}

/**
 * Manually clear cache for a specific business
 * Useful for force-refreshing after template changes
 */
export function clearTenantCache(businessUsername) {
    if (businessUsername) {
        tenantInformationCache.delete(businessUsername);
        console.log(`[Cache] Manually cleared cache for: ${businessUsername}`);
    } else {
        tenantInformationCache.clear();
        console.log('[Cache] Manually cleared all cache');
    }
}

/**
 * Get cache statistics (useful for debugging)
 */
export function getCacheStats() {
    const stats = {
        totalEntries: tenantInformationCache.size,
        entries: []
    };
    
    const now = Date.now();
    for (const [key, value] of tenantInformationCache.entries()) {
        if (value.timestamp) {
            const age = now - value.timestamp;
            const expired = isCacheExpired(value.timestamp);
            stats.entries.push({
                businessUsername: key,
                ageMinutes: Math.floor(age / 60000),
                expired
            });
        }
    }
    
    return stats;
}
