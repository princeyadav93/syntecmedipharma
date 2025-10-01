'use client';
import { motion } from 'framer-motion';
import { ProductGallery } from '@/components/userProduct/ProductGallery';
import { ProductInfo } from '@/components/userProduct/ProductInfo';
import type { Product } from '@/store/useProductStore';
import { useProductStore } from '@/store/useProductStore';
import { use } from 'react';

// Mock product data - replace with your actual data source
const mockProduct: Product = {
    _id: 'PROD123456',
    images: [
        'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
    ],
    brandName: 'Premium Organic Quinoa',
    composition: '100% Organic White Quinoa',
    category: 'Grains & Seeds',
    description:
        'Experience the finest quality organic quinoa, carefully sourced from sustainable farms. Rich in protein, fiber, and essential nutrients, our quinoa is perfect for salads, bowls, and as a nutritious side dish. Gluten-free and naturally delicious.',
    quantity: 500,
    unit: 'g',
    mrp: 450,
    price: 349,
    publish: true,
};

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Product Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
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

                {/* Additional Sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-7xl mx-auto mt-12"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-card  text-center bg-white">
                            <div className="text-4xl mb-2">🚚</div>
                            <h3 className="font-semibold mb-1">Bulk Orders</h3>
                            <p className="text-sm text-muted-foreground">
                                Special pricing for large quantities
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-card  text-center bg-white">
                            <div className="text-4xl mb-2">✨</div>
                            <h3 className="font-semibold mb-1">
                                Premium Quality
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                100% Organic & Certified
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-card  text-center bg-white">
                            <div className="text-4xl mb-2">🤝</div>
                            <h3 className="font-semibold mb-1">B2B Support</h3>
                            <p className="text-sm text-muted-foreground">
                                Dedicated account managers
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
