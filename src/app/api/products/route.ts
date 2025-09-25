import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb'; // you already have this
import { Product } from '@/models/products';

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        console.log(body);

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

export async function GET() {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
}
