import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { dbConnect } from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(req: Request) {
    try {
        const { name, email, password, uniqueCode } = await req.json();

        if (!name || !email || !password || !uniqueCode) {
            return NextResponse.json(
                { error: 'All fields required' },
                { status: 400 }
            );
        }

        // ✅ Server-side check
        if (uniqueCode !== process.env.SIGNUP_SECRET_CODE) {
            return NextResponse.json(
                { error: 'Invalid unique code' },
                { status: 403 }
            );
        }

        await dbConnect();

        const existing = await Admin.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { error: 'Admin already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: 'Admin created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
