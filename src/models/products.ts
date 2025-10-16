import mongoose, { Schema } from 'mongoose';

export enum QuantityUnit {
    PACKET = 'packet',
    ML = 'ml',
}
export enum ProductCategory {
    HGC = 'hard gelatin capsules',
    Syrups = 'syrups',
    Injections = 'injections',
    Creams = 'creams',
    Sachets = 'sachets',
    Soaps = 'soaps',
    Gels = 'gels',
    Mouthwash = 'mouthwash',
}

export interface IProduct {
    images: string[];
    brandName: string;
    composition: string;
    description?: string;
    mrp: number;
    quantity: number;
    unit: QuantityUnit;
    publish: boolean;
    category: string;
}

const ProductSchema = new Schema<IProduct>(
    {
        images: [{ type: String, required: true }],
        brandName: { type: String, required: true },
        composition: { type: String, required: true },
        description: { type: String },
        mrp: { type: Number, required: true },
        quantity: { type: Number, required: true },
        unit: {
            type: String,
            enum: Object.values(QuantityUnit),
            required: true,
        },
        publish: { type: Boolean, default: false },
        category: {
            type: String,
            enum: Object.values(ProductCategory),
            required: true,
        },
    },
    { timestamps: true }
);

let Product: mongoose.Model<IProduct>;

try {
    Product = mongoose.model<IProduct>('Product');
} catch {
    Product = mongoose.model<IProduct>('Product', ProductSchema);
}

export { Product };
