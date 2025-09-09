import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Extend global type
declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

// ✅ Ensure cached is always initialized
const cached: MongooseCache = global.mongooseCache || {
    conn: null,
    promise: null,
};
global.mongooseCache = cached;

export async function dbConnect(): Promise<Mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            maxPoolSize: 10,
            dbName: 'sougvanAyurveda',
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err: unknown) {
        cached.promise = null;
        if (err instanceof Error) {
            throw new Error(`MongoDB connection failed: ${err.message}`);
        }
        throw new Error('MongoDB connection failed: Unknown error');
    }

    return cached.conn;
}
