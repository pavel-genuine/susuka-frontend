import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // const url=request.nextUrl.clone()

    let isAdmin = request.cookies.get('admin');
    let isUser = request.cookies.get('user');
    if (!isAdmin) {
        if (!isUser) {
            if (request.nextUrl.pathname.startsWith('/prompt-writer')) {
                return NextResponse.rewrite(new URL('/auth', request.url));
            }
            if (request.nextUrl.pathname.startsWith('/dashboard')) {
                return NextResponse.rewrite(new URL('/auth', request.url));
            }
        }
    }
}
