// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

async function uploadToCloudinary(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
                if (error) reject(error);
                else if (result?.secure_url) resolve(result.secure_url);
                else reject(new Error('Upload failed'));
            }
        );
        stream.end(buffer);
    });
}

export async function POST(req: Request) {
    try {
        // Parse multipart/form-data directly
        const formData = await req.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Upload all files to Cloudinary
        const uploadedUrls = await Promise.all(files.map(uploadToCloudinary));

        return NextResponse.json({ urls: uploadedUrls });
    } catch (err) {
        console.error('Cloudinary upload failed:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
