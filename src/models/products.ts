import mongoose, { Schema } from 'mongoose';

export enum QuantityUnit {
    MG = 'mg',
    ML = 'ml',
    GRAM = 'gram',
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
    Tablets = 'tablets',
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

export const imageSchema = new Schema(
    {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    { _id: false }
);

const ProductSchema = new Schema(
    {
        brandName: { type: String, required: true },
        composition: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        mrp: { type: Number, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        images: { type: [imageSchema], required: true }, // 👈 update this!
        publish: { type: Boolean, default: false },
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
