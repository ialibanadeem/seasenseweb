import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('seasense_auth_token')?.value;

    const publicRoutes = ['/login', '/register', '/verify', '/forgot-password', '/reset-password'];
    const isAuthPage = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    // If trying to access login/register but already authenticated
    if (isAuthPage && token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If trying to access protected routes but NO token
    if (!isAuthPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Protect all routes EXCEPT static files, api routes, and purely visual images
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|screenshots|promo_video).*)',
    ],
};
