import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Product } from '@/models/products';

// DELETE product
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    await dbConnect();
    try {
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { error: 'An unknown error occurred' },
            { status: 400 }
        );
    }
}

// PATCH toggle publish
export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> } // <- params is async now
) {
    const { id } = await context.params; // ✅ await params

    await dbConnect();

    try {
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        product.publish = !product.publish;
        await product.save({ validateBeforeSave: false });

        return NextResponse.json(product);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { error: 'An unknown error occurred' },
            { status: 400 }
        );
    }
}
