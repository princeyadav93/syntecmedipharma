import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb'; // you already have this
import { Product } from '@/models/products';

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();

        const newProduct = await Product.create({
            ...body,
            publish: false, // always override
        });

        return NextResponse.json({
            message: '✅ Product created',
            product: newProduct,
        });
    } catch (error) {
        console.error('Mongo Save Error:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
