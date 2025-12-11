/**
 * Reserved paths that should not be treated as business slugs
 * These paths are used by the system and should not be available as business usernames
 */
export const RESERVED_PATHS = [
    'business-admin',   // CMS admin routes
    'authenticate',     // Auth routes
    'order-status',     // Order tracking
    'api',              // API routes
    '_next',            // Next.js internal
    '.well-known',      // Well-known URIs (RFC 8615)
    'favicon.ico',      // Favicon
    'public',           // Public assets
    'static',           // Static assets
    'assets',           // Assets
    'admin',            // Admin routes
    'dashboard',        // Dashboard routes
    'login',            // Login routes
    'register',         // Registration routes
    'logout',           // Logout routes
    'signup',           // Signup routes
    'signin',           // Signin routes
    'auth',             // Auth routes
    'oauth',            // OAuth routes
    'callback',         // Callback routes
    'api-auth',         // API auth routes
    'health',           // Health check
    'status',           // Status check
    'robots.txt',       // Robots file
    'sitemap.xml',      // Sitemap
    'manifest.json'     // PWA manifest
];

/**
 * Check if a path is reserved
 * @param {string} path - The path to check
 * @returns {boolean} - True if the path is reserved
 */
export function isReservedPath(path) {
    if (!path) return false;
    // Check exact match and also check if path starts with any reserved path
    return RESERVED_PATHS.some(reserved => 
        path === reserved || path.startsWith(`${reserved}/`)
    );
}
