import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
    const cookieHeader = req.headers.get('cookie') ?? '';
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);

    if (!tokenMatch) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        );
    }

    const token = tokenMatch[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json({ user: decoded });
}
