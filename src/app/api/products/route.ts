// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Product } from '@/models/products';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: Request) {
    await dbConnect();

    let images: { url: string; public_id: string }[] = [];

    try {
        const body = await req.json();

        const {
            brandName,
            composition,
            category,
            description,
            mrp,
            quantity,
            unit,
            images: productImages,
        } = body;
        console.log(body);

        // Assign images for potential cleanup
        images = productImages;

        // 🧩 Basic backend validation
        if (
            !brandName?.trim() ||
            !composition?.trim() ||
            !category?.trim() ||
            !description?.trim() ||
            mrp === undefined ||
            !quantity?.trim() ||
            !unit
        ) {
            // Validation failed — cleanup Cloudinary images
            await cleanupImages(images);

            return NextResponse.json(
                { error: 'Missing required product fields' },
                { status: 400 }
            );
        }

        if (!images || !Array.isArray(images) || images.length === 0) {
            // Cleanup not needed if no images, but safe to call anyway
            await cleanupImages(images);

            return NextResponse.json(
                { error: 'At least one product image is required' },
                { status: 400 }
            );
        }

        try {
            // 🧠 Create product
            const newProduct = await Product.create({
                brandName,
                composition,
                category,
                description,
                mrp,
                quantity,
                unit,
                images, // [{url, public_id}]
                publish: false,
            });

            return NextResponse.json({
                message: '✅ Product created successfully',
                product: newProduct,
            });
        } catch (err) {
            console.error('Mongo Save Error:', err);

            // DB insertion failed → cleanup Cloudinary
            await cleanupImages(images);

            return NextResponse.json(
                { error: 'Failed to create product' },
                { status: 500 }
            );
        }
    } catch (err) {
        console.error('Server Error:', err);

        // Global fallback → cleanup Cloudinary
        await cleanupImages(images);

        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

/**
 * Helper function to delete images from Cloudinary if something fails
 */
async function cleanupImages(
    images: { url: string; public_id: string }[] | undefined
) {
    if (!images || images.length === 0) return;

    await Promise.all(
        images.map((img) =>
            cloudinary.uploader.destroy(img.public_id).catch(() => {
                console.warn(
                    `⚠️ Failed to delete Cloudinary image: ${img.public_id}`
                );
            })
        )
    );
}

export async function GET() {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
}
