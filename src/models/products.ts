import mongoose, { Schema, model } from 'mongoose';

export enum QuantityUnit {
    PACKET = 'packet',
    ML = 'ml',
}

const ProductSchema = new Schema(
    {
        images: [{ type: String, required: true }],
        brandName: { type: String, required: true },
        composition: { type: String, required: true },
        description: { type: String },
        mrp: { type: Number, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        unit: {
            type: String,
            enum: Object.values(QuantityUnit),
            required: true,
        },
        publish: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Product =
    (mongoose.models?.Product as mongoose.Model<any>) ||
    model('Product', ProductSchema);

export { Product };
