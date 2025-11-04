import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Product } from '@/models/products';
import cloudinary from '@/lib/cloudinary';

// DELETE product
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    await dbConnect();
    try {
        // 🧩 Find product first
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // ✅ Explicitly tell TS what type product.images actually is
        await cleanupImages(
            product.images as unknown as { url: string; public_id: string }[]
        );

        await Product.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Delete failed:', error);
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

export async function cleanupImages(
    images?: { url: string; public_id: string }[]
) {
    if (!images || images.length === 0) return;

    await Promise.all(
        images.map(async (img) => {
            try {
                const result = await cloudinary.uploader.destroy(img.public_id);
                if (result.result !== 'ok' && result.result !== 'not found') {
                    console.warn(
                        `⚠️ Cloudinary delete failed for: ${img.public_id}`,
                        result
                    );
                }
            } catch (err) {
                console.warn(
                    `⚠️ Cloudinary deletion error for: ${img.public_id}`,
                    err
                );
            }
        })
    );
}
