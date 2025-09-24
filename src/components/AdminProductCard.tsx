import { useState } from 'react';
type Product = {
    _id: string;
    brandName: string;
    composition: string;
    description: string;
    unit: string;
    quantity: number;
    image: string;
    mrp: number;
    price: number;
    type: 'Syrups' | 'Ayurvedic Syrups' | 'Dry Syrups';
    publish: boolean;
};

export default function AdminProductCard({
    product,
    togglePublish,
    deleteProduct,
}: {
    product: Product;
    togglePublish: (id: string) => void;
    deleteProduct: (id: string) => void;
}) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.brandName}
                className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-bold mt-3">{product.brandName}</h3>
            <p className="text-sm text-gray-600">{product.composition}</p>
            <p className="text-sm text-gray-500 line-clamp-3 mt-2">
                {product.description}
            </p>
            <p className="mt-2 text-gray-800">
                <span className="line-through text-gray-500">
                    ₹{product.mrp}
                </span>{' '}
                <span className="font-semibold text-green-600">
                    ₹{product.price}
                </span>
            </p>
            <p className="text-sm text-gray-500">
                {product.quantity} {product.unit}
            </p>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => togglePublish(product._id)}
                    className={`px-3 py-1 rounded text-white ${
                        product.publish ? 'bg-yellow-500' : 'bg-green-600'
                    }`}
                >
                    {product.publish ? 'Unpublish' : 'Publish'}
                </button>
                <button
                    onClick={() => setShowConfirm(true)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                >
                    Delete
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-bold mb-4">
                            Confirm Delete
                        </h3>
                        <p className="mb-4">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold">
                                {product.brandName}
                            </span>
                            ?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    deleteProduct(product._id);
                                    setShowConfirm(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
