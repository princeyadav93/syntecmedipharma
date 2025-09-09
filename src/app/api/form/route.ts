import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Form } from '@/models/Form';

export async function POST(req: Request): Promise<Response> {
    try {
        await dbConnect();
        const body = await req.json();

        // Simple validation
        if (!body.name || !body.phone) {
            return NextResponse.json(
                { success: false, error: 'Name and phone are required' },
                { status: 400 }
            );
        }

        const newForm = await Form.create(body);

        return NextResponse.json(
            { success: true, data: newForm },
            { status: 201 }
        );
    } catch (err: unknown) {
        let message = 'An unknown error occurred';
        if (err instanceof Error) {
            message = err.message;
        }

        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);

        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const query: Record<string, unknown> = {};

        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const forms = await Form.find(query).sort({ createdAt: -1 }).lean();

        return NextResponse.json(forms);
    } catch (error) {
        console.error(
            'API Error:',
            error instanceof Error ? error.message : error
        );

        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}
