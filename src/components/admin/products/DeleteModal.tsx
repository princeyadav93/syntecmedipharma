'use client';
import { AlertTriangle } from 'lucide-react';
import { Product } from '@/store/useProductStore';

export default function DeleteModal({
    product,
    onConfirm,
    onCancel,
}: {
    product: Product;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold">Confirm Deletion</h3>
                </div>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold">{product.brandName}</span>?
                    This action <strong>cannot</strong> be undone.
                </p>

                <div className="flex space-x-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 border rounded-xl hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
}
