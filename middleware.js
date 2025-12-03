import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Extract subdomain from hostname
  // Examples: 
  // - restaurant-ame.localhost:3000 -> restaurant-ame
  // - localhost:3000 -> localhost
  const parts = hostname.split('.');
  const subdomain = parts[0];
  
  // Skip rewriting if:
  // 1. It's plain localhost (no subdomain)
  // 2. It's www
  // 3. It's an IP address
  // 4. It doesn't have .localhost or .local in it
  if (
    (subdomain === 'localhost' || subdomain === '127' || subdomain === '0') ||
    subdomain === 'www' ||
    /^\d+\.\d+\.\d+\.\d+$/.test(hostname) ||
    (!hostname.includes('.localhost') && !hostname.includes('.local'))
  ) {
    return NextResponse.next();
  }
  
  // Check if we have a valid subdomain (not localhost itself)
  // restaurant-ame.localhost:3000 -> rewrite to /restaurant-ame
  if (subdomain && parts.length > 1 && (parts[1] === 'localhost' || parts[1] === 'local')) {
    // Rewrite the URL to include the subdomain as a path
    // restaurant-ame.localhost:3000/ -> /restaurant-ame/
    // restaurant-ame.localhost:3000/home -> /restaurant-ame/home
    url.pathname = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

