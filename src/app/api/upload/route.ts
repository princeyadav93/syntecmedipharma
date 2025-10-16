// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

async function uploadToCloudinary(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
                if (error || !result)
                    return reject(error || new Error('Upload failed'));
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id, // important!
                });
            }
        );
        stream.end(buffer);
    });
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        const uploadedImages = await Promise.all(files.map(uploadToCloudinary));

        return NextResponse.json({ images: uploadedImages });
    } catch (err) {
        console.error('Cloudinary upload failed:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
