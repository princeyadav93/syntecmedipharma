import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (
        req.nextUrl.pathname.startsWith('/dashboard') &&
        !req.nextUrl.pathname.startsWith('/dashboard/login') &&
        !req.nextUrl.pathname.startsWith('/dashboard/sign-up')
    ) {
        if (!token) {
            return NextResponse.redirect(new URL('/dashboard/login', req.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

            // ✅ async verify with jose
            const { payload } = await jwtVerify(token, secret);

            if (!payload) {
                return NextResponse.redirect(
                    new URL('/dashboard/login', req.url)
                );
            }

            return NextResponse.next();
        } catch (err) {
            console.error('JWT verify failed ❌:', err);
            return NextResponse.redirect(new URL('/dashboard/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
