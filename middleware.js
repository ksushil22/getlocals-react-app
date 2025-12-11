// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone();

    // host can be like:
    // - 'rij-kitchen.localhost:3000'
    // - 'rij-kitchen.getlocals.ca'
    // - 'localhost:3000'
    const host = request.headers.get('host') || '';

    // Strip port
    const hostname = host.split(':')[0]; // e.g. 'rij-kitchen.localhost'
    const parts = hostname.split('.');   // e.g. ['rij-kitchen', 'localhost'] or ['rij-kitchen', 'getlocals', 'ca']

    // Determine if this is a subdomain request
    let hasSubdomain = false;
    let subdomain = '';
    let rootDomain = '';

    if (parts.length === 2) {
        // e.g. ['rij-kitchen', 'localhost'] or ['something', 'com']
        const possibleSubdomain = parts[0];
        const possibleDomain = parts[1];
        
        // Only treat as subdomain for localhost
        if (possibleDomain === 'localhost' && possibleSubdomain !== 'localhost') {
            hasSubdomain = true;
            subdomain = possibleSubdomain;
            rootDomain = possibleDomain;
        }
    } else if (parts.length === 3) {
        // e.g. ['rij-kitchen', 'getlocals', 'ca']
        subdomain = parts[0];
        rootDomain = parts.slice(1).join('.');
        hasSubdomain = true;
    }

    // If no subdomain, it's the main domain - don't rewrite anything
    if (!hasSubdomain) {
        return NextResponse.next();
    }

    // main domains where we support subdomains
    const tenantRoots = ['localhost', 'getlocals.ca'];

    // If not one of our tenant roots, do nothing
    if (!tenantRoots.includes(rootDomain)) {
        return NextResponse.next();
    }

    // Ignore www and reserved subdomains
    const reservedSubdomains = ['www'];
    if (reservedSubdomains.includes(subdomain)) {
        return NextResponse.next();
    }

    // Rewrite subdomain to slug route:
    // rij-kitchen.localhost:3000/        -> /rij-kitchen
    // rij-kitchen.localhost:3000/foo     -> /rij-kitchen/foo
    // rij-kitchen.getlocals.ca/bar/baz   -> /rij-kitchen/bar/baz
    url.pathname = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
