'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Product = {
    _id: string;
    images: string[];
    brandName: string;
    composition: string;
    category: string;
    description?: string;
    quantity: number;
    unit: string;
    mrp: number;
    publish: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
    const badgeColor =
        product.category === 'Syrups'
            ? 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200'
            : product.category === 'Ayurvedic Syrups'
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200'
            : 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Link href={`/products/${product._id}`}>
                <div className="max-w-sm w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-[1.02] cursor-pointer bg-white">
                    {/* Product Image */}
                    <div className="h-44 w-full  flex items-center justify-center">
                        <Image
                            width={200}
                            height={200}
                            src={product.images[0]}
                            alt={product.brandName}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-2">
                        {/* Title + Badge */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold">
                                {product.brandName}
                            </h2>
                            <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${badgeColor}`}
                            >
                                {product.category}
                            </span>
                        </div>

                        {/* Composition */}
                        <p className="text-sm line-clamp-2 p-0">
                            {product.composition}
                        </p>

                        {/* Pack */}
                        <p className="text-sm p-0">Pack: {product.unit}</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
