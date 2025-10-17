'use client';
import { motion } from 'framer-motion';
// import { ProductGallery } from '@/components/userProduct/ProductGallery'; // Assumed from original code
// import { ProductInfo } from '@/components/userProduct/ProductInfo'; // Assumed from original code
import { useProductStore } from '@/store/useProductStore';
import { use } from 'react';
import { Truck, Award, Users } from 'lucide-react'; // Added utility icons for the boxes
import { ProductGallery } from '@/components/userProduct/ProductGallery';
import { ProductInfo } from '@/components/userProduct/ProductInfo';

// Define the primary color constant
const PRIMARY_COLOR = '#0e8b8b';

// Mock ProductGallery and ProductInfo imports for the final complete code block

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { products } = useProductStore();
    const { id } = use(params);

    const product = products.find((p) => p._id.toString() === id);

    if (!product) {
        return (
            <div className="p-10 text-center text-gray-500">
                Product not found.
            </div>
        );
    }
    return (
        // Clean, light background
        <div className="min-h-screen bg-gray-50  py-3 md:py-16">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-4">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Product Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Assuming the ProductGallery component has been updated to match the new style */}
                        <ProductGallery
                            images={product.images}
                            productName={product.brandName}
                        />
                    </motion.div>

                    {/* Product Information */}
                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>

                {/* Additional Sections - Value Propositions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-7xl mx-auto mt-16"
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                        Why Choose Us?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Box 1: Bulk Orders */}
                        <div className="p-8 rounded-xl border border-gray-200 bg-white shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                            <Truck
                                className="h-10 w-10 mx-auto mb-3"
                                style={{ color: PRIMARY_COLOR }}
                            />
                            <h3 className="font-bold text-lg mb-1 text-gray-800">
                                Global Shipping
                            </h3>
                            <p className="text-sm text-gray-500">
                                Special pricing for large quantity orders.
                            </p>
                        </div>
                        {/* Box 2: Premium Quality */}
                        <div className="p-8 rounded-xl border border-gray-200 bg-white shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                            <Award
                                className="h-10 w-10 mx-auto mb-3"
                                style={{ color: PRIMARY_COLOR }}
                            />
                            <h3 className="font-bold text-lg mb-1 text-gray-800">
                                Certified Quality
                            </h3>
                            <p className="text-sm text-gray-500">
                                100% Organic & fully audited production.
                            </p>
                        </div>
                        {/* Box 3: B2B Support */}
                        <div className="p-8 rounded-xl border border-gray-200 bg-white shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                            <Users
                                className="h-10 w-10 mx-auto mb-3"
                                style={{ color: PRIMARY_COLOR }}
                            />
                            <h3 className="font-bold text-lg mb-1 text-gray-800">
                                B2B Support
                            </h3>
                            <p className="text-sm text-gray-500">
                                Dedicated account managers and priority service.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
