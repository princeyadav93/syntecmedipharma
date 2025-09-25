'use client';
import { useState } from 'react';
import { Edit, X, Save, ImageIcon } from 'lucide-react';
// import { Product } from '@/lib/mockProducts';
import { useProductStore } from '@/store/useProductStore';
import { Product } from '@/store/useProductStore';

export default function EditProductModal({
    product,
    onSave,
    onCancel,
}: {
    product: Product;
    onSave: (p: Product) => void;
    onCancel: () => void;
}) {
    const { products } = useProductStore();
    const [formData, setFormData] = useState<Product>({ ...product });
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(product.images[0] || '');

    const handleChange = (field: keyof Product, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1000)); // simulate API
        onSave(formData);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Edit className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Edit Product
                        </h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-xl"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* --- Brand Name --- */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Brand Name *
                        </label>
                        <input
                            type="text"
                            value={formData.brandName}
                            onChange={(e) =>
                                handleChange('brandName', e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                        />
                    </div>

                    {/* --- Composition --- */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Composition *
                        </label>
                        <input
                            type="text"
                            value={formData.composition}
                            onChange={(e) =>
                                handleChange('composition', e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            category *
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) =>
                                handleChange('composition', e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                        />
                    </div>

                    {/* --- Description --- */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) =>
                                handleChange('description', e.target.value)
                            }
                            rows={3}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* --- Product Type --- */}
                    {/* <div>
                        <label className="block text-sm font-semibold mb-2">
                            Product Type *
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) =>
                                handleChange(
                                    'type',
                                    e.target.value as Product['type']
                                )
                            }
                            className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                        >
                            <option value="Syrups">Syrups</option>
                            <option value="Ayurvedic Syrups">
                                Ayurvedic Syrups
                            </option>
                            <option value="Dry Syrups">Dry Syrups</option>
                        </select>
                    </div> */}

                    {/* --- Quantity & Unit --- */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={formData.quantity}
                                onChange={(e) =>
                                    handleChange(
                                        'quantity',
                                        parseInt(e.target.value)
                                    )
                                }
                                className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Unit *
                            </label>
                            <select
                                value={formData.unit}
                                onChange={(e) =>
                                    handleChange('unit', e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                            >
                                <option value="ml">ml</option>
                                <option value="mg">mg</option>
                                <option value="g">g</option>
                                <option value="tablets">tablets</option>
                                <option value="capsules">capsules</option>
                            </select>
                        </div>
                    </div>

                    {/* --- MRP & Price --- */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                MRP (₹) *
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.mrp}
                                onChange={(e) =>
                                    handleChange(
                                        'mrp',
                                        parseFloat(e.target.value)
                                    )
                                }
                                className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Price (₹) *
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) =>
                                    handleChange(
                                        'price',
                                        parseFloat(e.target.value)
                                    )
                                }
                                className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* --- Publish Status --- */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Publication Status
                        </label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={formData.publish}
                                    onChange={() =>
                                        handleChange('publish', true)
                                    }
                                />
                                Published
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={!formData.publish}
                                    onChange={() =>
                                        handleChange('publish', false)
                                    }
                                />
                                Unpublished
                            </label>
                        </div>
                    </div>

                    {/* --- Actions --- */}
                    <div className="flex gap-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 border rounded-xl hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
