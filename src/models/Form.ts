import { Schema, model, models } from 'mongoose';

const FormSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: false },
        pincode: { type: String, required: false },
        consent: { type: Boolean, required: true },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Form = models.Form || model('Form', FormSchema);
