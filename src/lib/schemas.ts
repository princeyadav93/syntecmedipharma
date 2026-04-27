import { z } from 'zod';

/**
 * Image object schema
 */
export const imageSchema = z.object({
    url: z.string().url('Invalid image URL'),
    public_id: z.string().min(1, 'Image public_id required'),
});

/**
 * Product creation/update schema
 */
export const productSchema = z.object({
    brandName: z.string().trim().min(1, 'Brand name is required'),
    composition: z.string().trim().min(1, 'Composition is required'),
    category: z.string().trim().min(1, 'Category is required'),
    description: z
        .string()
        .trim()
        .min(10, 'Description must be at least 10 characters'),
    mrp: z.number().positive('MRP must be a positive number'),
    quantity: z.string().trim().min(1, 'Quantity is required'),
    unit: z.enum(['mg', 'ml', 'gram'], {
        message: 'Invalid unit',
    }),
    images: z.array(imageSchema).min(1, 'At least one image is required'),
    publish: z.boolean().optional().default(false),
});

export type ProductSchema = z.infer<typeof productSchema>;

/**
 * Login schema
 */
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

/**
 * Sign-up schema
 */
export const signUpSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
    name: z.string().trim().min(2, 'Name is required'),
    address: z.string().trim().min(5, 'Address is required'),
    phone: z.string().regex(/^\d{10}$/, 'Phone must be a 10-digit number'),
    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be a 6-digit number'),
    consent: z.boolean().refine((val) => val === true, {
        message: 'You must consent to be contacted',
    }),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
