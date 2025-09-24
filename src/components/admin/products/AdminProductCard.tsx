'use client';
import { useState } from 'react';
import { Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { Product } from '@/lib/mockProducts';
import DeleteModal from '@/components/admin/products/DeleteModal';

export default function AdminProductCard({
    product,
    onTogglePublish,
    onDelete,
    onEdit,
    viewMode,
}: {
    product: Product;
    onTogglePublish: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
    viewMode: 'grid' | 'list';
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (viewMode === 'list') {
        return (
            <>
                <div className="bg-white/70 rounded-2xl p-6 border shadow-sm hover:shadow-md transition">
                    <div className="flex items-center space-x-6">
                        <img
                            src={product.images[0]}
                            alt={product.brandName}
                            className="w-24 h-24 object-cover rounded-xl"
                        />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-bold truncate">
                                    {product.brandName}
                                </h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        product.publish
                                            ? 'bg-green-100 text-green-700 border border-green-200'
                                            : 'bg-red-100 text-red-700 border border-red-200'
                                    }`}
                                >
                                    {product.publish
                                        ? 'Published'
                                        : 'Unpublished'}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                                {product.composition}
                            </p>
                            {product.description && (
                                <p className="text-gray-500 text-sm line-clamp-1 mb-3">
                                    {product.description}
                                </p>
                            )}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm line-through text-gray-400">
                                        ₹{product.mrp}
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        ₹{product.price}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                    {product.quantity} {product.unit}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => onTogglePublish(product._id)}
                                className={`p-2 rounded-xl ${
                                    product.publish
                                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                            >
                                {product.publish ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                            <button
                                onClick={() => onEdit(product)}
                                className="p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl"
                            >
                                <Edit className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {showDeleteModal && (
                    <DeleteModal
                        product={product}
                        onConfirm={() => {
                            onDelete(product._id);
                            setShowDeleteModal(false);
                        }}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <div className="bg-white/70 rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition group">
                <div className="relative">
                    <img
                        src={product.images[0]}
                        alt={product.brandName}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-4 right-4">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.publish
                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                    : 'bg-red-100 text-red-700 border border-red-200'
                            }`}
                        >
                            {product.publish ? 'Published' : 'Unpublished'}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">
                        {product.brandName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                        {product.composition}
                    </p>
                    {product.description && (
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                            {product.description}
                        </p>
                    )}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm line-through text-gray-400">
                                ₹{product.mrp}
                            </span>
                            <span className="font-semibold text-green-600">
                                ₹{product.price}
                            </span>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                            {product.quantity} {product.unit}
                        </span>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => onTogglePublish(product._id)}
                            className={`flex-1 flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-medium ${
                                product.publish
                                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200 border'
                            }`}
                        >
                            {product.publish ? (
                                <EyeOff className="h-4 w-4 mr-2" />
                            ) : (
                                <Eye className="h-4 w-4 mr-2" />
                            )}
                            {product.publish ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                            onClick={() => onEdit(product)}
                            className="px-3 py-2.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl text-xs font-medium border"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="px-3 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl text-xs font-medium border"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    product={product}
                    onConfirm={() => {
                        onDelete(product._id);
                        setShowDeleteModal(false);
                    }}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
}
