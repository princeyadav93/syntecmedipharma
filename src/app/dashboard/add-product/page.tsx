'use client';
import { QuantityUnit, ProductCategory } from '@/models/products';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Upload,
    X,
    Plus,
    Package,
    DollarSign,
    FileText,
    Image as ImageIcon,
} from 'lucide-react';
import LogOutComp from '@/components/LogOutComp';

export interface ProductFormValues {
    images: string[];
    brandName: string;
    composition: string;
    category: string;
    description: string;
    mrp: string; // stored as string
    quantity: string; // stored as string
    unit: QuantityUnit;
    publish: boolean;
}

export default function AddProductForm() {
    const [form, setForm] = useState<ProductFormValues>({
        images: [],
        brandName: '',
        composition: '',
        description: '',
        mrp: '',
        quantity: '',
        category: ProductCategory.HGC,
        unit: QuantityUnit.ML,
        publish: false,
    });

    const [fileInputs, setFileInputs] = useState<File[][]>([[]]);
    const [uploading, setUploading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value, // keep everything as string
        }));
    };

    // Handle file input
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setFileInputs((prev) => {
            const newInputs = [...prev];
            newInputs[index] = files;
            return newInputs;
        });
    };

    // Add new file input field
    const addFileInput = () => {
        setFileInputs((prev) => [...prev, []]);
    };

    // Remove file input field
    const removeFileInput = (index: number) => {
        if (fileInputs.length === 1) return; // Keep at least one
        setFileInputs((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            // 1️⃣ Upload all files
            const uploadedImages: { url: string; public_id: string }[] = [];

            for (const files of fileInputs) {
                if (files.length === 0) continue;

                const formData = new FormData();
                files.forEach((file) => formData.append('file', file));

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) throw new Error('Upload failed');
                const data = await res.json();

                if (data?.images) {
                    uploadedImages.push(...data.images);
                }
            }

            // 2️⃣ Prepare final product data
            const productData = {
                ...form,
                images: uploadedImages, // full objects (not just URLs)
                mrp: Number(form.mrp),
                quantity: Number(form.quantity),
            };

            // 3️⃣ Save product
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (!res.ok) throw new Error('Failed to save product');
            alert('✅ Product created successfully!');

            // Reset
            setForm({
                images: [],
                brandName: '',
                composition: '',
                category: '',
                description: '',
                mrp: '',
                quantity: '',
                unit: QuantityUnit.ML,
                publish: false,
            });
            setFileInputs([[]]);
        } catch (error) {
            console.error(error);
            alert('❌ Error creating product');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <LogOutComp />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-6 flex gap-3 items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-theme rounded-full "
                    >
                        <Plus className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Add New Product
                    </h1>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Image Upload Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                                    <ImageIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Product Images
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Upload high-quality images of your
                                        product
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {fileInputs.map((files, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group"
                                    >
                                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#0e8b8b] transition-colors duration-200 bg-gray-50 hover:bg-blue-50">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleFileChange(e, index)
                                                }
                                                required
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="text-center">
                                                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                                <p className="text-sm p-0 text-gray-600">
                                                    {files.length > 0 ? (
                                                        <span className="text-blue-600 font-medium">
                                                            {files.length}{' '}
                                                            file(s) selected
                                                        </span>
                                                    ) : (
                                                        <>
                                                            Click to upload or
                                                            drag and drop
                                                        </>
                                                    )}
                                                </p>
                                                <p className="text-xs p-0 text-gray-400 mt-1">
                                                    PNG, JPG, JPEG up to 10MB
                                                    each
                                                </p>
                                            </div>
                                            {fileInputs.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFileInput(index)
                                                    }
                                                    className="absolute top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4 text-red-600 cursor-pointer" />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addFileInput}
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-[#0e8b8b] transition-colors duration-200 cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add More Images
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                        {/* Product Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                    <Package className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Product Details
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Basic information about your product
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        name="brandName"
                                        placeholder="Enter brand name"
                                        required
                                        value={form.brandName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0e8b8b] focus:border-transparent transition-all duration-200 placeholder-gray-400 outline-0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Composition
                                    </label>
                                    <input
                                        type="text"
                                        name="composition"
                                        placeholder="Product composition"
                                        required
                                        value={form.composition}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0e8b8b] focus:border-transparent transition-all duration-200 placeholder-gray-400 outline-0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0e8b8b] focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
                                    >
                                        <option value={ProductCategory.HGC}>
                                            Hard Gelatin Capsules
                                        </option>
                                        <option value={ProductCategory.Syrups}>
                                            Syrups - Drug & Food
                                        </option>
                                        <option
                                            value={ProductCategory.Injections}
                                        >
                                            Injections
                                        </option>
                                        <option value={ProductCategory.Creams}>
                                            Creams
                                        </option>
                                        <option value={ProductCategory.Sachets}>
                                            Sachets
                                        </option>
                                        <option value={ProductCategory.Soaps}>
                                            Soaps
                                        </option>
                                        <option value={ProductCategory.Gels}>
                                            Gels
                                        </option>
                                        <option
                                            value={ProductCategory.Mouthwash}
                                        >
                                            Mouthwash
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Detailed product description..."
                                    value={form.description}
                                    required
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0e8b8b] focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none outline-0"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                        {/* Pricing Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                                    <DollarSign className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Pricing & Quantity
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Set pricing and quantity information
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        MRP (₹)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-500">
                                            ₹
                                        </span>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            name="mrp"
                                            placeholder="0"
                                            required
                                            value={form.mrp}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d{0,6}$/.test(value)) {
                                                    handleChange(e);
                                                }
                                            }}
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0e8b8b] focus:border-transparent transition-all duration-200 placeholder-gray-400 outline-0"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Quantity & Unit
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            name="quantity"
                                            placeholder="0"
                                            value={form.quantity}
                                            required
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d{0,6}$/.test(value)) {
                                                    handleChange(e);
                                                }
                                            }}
                                            className="w-full flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0e8b8b] focus:border-transparent transition-all duration-200 placeholder-gray-400 outline-0"
                                        />
                                        <select
                                            name="unit"
                                            value={form.unit}
                                            onChange={handleChange}
                                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0e8b8b] focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
                                        >
                                            <option value={QuantityUnit.ML}>
                                                Ml
                                            </option>
                                            <option value={QuantityUnit.MG}>
                                                Mg
                                            </option>
                                            <option value={QuantityUnit.GRAM}>
                                                Gram
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <motion.button
                                type="submit"
                                disabled={uploading}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r bg-theme text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {uploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-5 h-5" />
                                        Save Product
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}
