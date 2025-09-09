import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { dbConnect } from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        await dbConnect();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials-email' },
                { status: 401 }
            );
        }

        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) {
            return NextResponse.json(
                { error: 'Invalid credentials-password' },
                { status: 401 }
            );
        }

        // ✅ jose expects Uint8Array secret
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

        const token = await new SignJWT({
            id: admin._id,
            email: admin.email,
            name: admin.name,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5h') // same expiry
            .sign(secret);

        const res = NextResponse.json({ message: 'Login successful' });
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 5, // 5h in seconds
            sameSite: 'strict',
        });

        return res;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
