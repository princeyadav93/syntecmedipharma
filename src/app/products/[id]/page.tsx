'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

// ------------------------------
// Product Data (mock database)
// ------------------------------
const products = [
    {
        id: '1',
        title: 'Herbal Digestive Tea',
        description:
            'A soothing tea blend made with natural herbs to improve digestion and overall wellness. Perfect for calming the body and mind.',
        image: '/images/earcare.webp',
        category: 'Nature’s Remedies',
        benefits: [
            '100% Natural Ingredients',
            'Boosts Digestion',
            'Soothing & Refreshing',
        ],
        ingredients: [
            'Ginger Root',
            'Peppermint Leaves',
            'Chamomile',
            'Lemon Balm',
            'Fennel Seeds',
        ],
    },
    {
        id: '2',
        title: 'Calming Essential Oil Blend',
        description:
            'Relaxing oil blend for peace of mind and body balance. Ideal for aromatherapy or massage.',
        image: '/images/earcare.webp',
        category: 'Nature’s Remedies',
        benefits: [
            'Relieves Stress',
            'Promotes Relaxation',
            'Pure Essential Oils',
        ],
        ingredients: ['Lavender Oil', 'Ylang Ylang', 'Bergamot', 'Sandalwood'],
    },
    {
        id: '3',
        title: 'Natural Skin Nourishing Cream',
        description:
            'Hydrating Ayurvedic cream for radiant skin made with natural botanicals.',
        image: '/images/earcare.webp',
        category: 'Nature’s Remedies',
        benefits: ['Deeply Hydrating', 'Brightens Skin', 'Chemical-Free'],
        ingredients: ['Aloe Vera', 'Coconut Oil', 'Turmeric', 'Saffron'],
    },
];

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
                <p className="text-lg font-medium">Product not found</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-12">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg"
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        height={500}
                        width={500}
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                    />
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="space-y-6"
                >
                    <div className="flex justify-between">
                        <Link href="/#contact">
                            <p className="uppercase text-sm font-semibold text-theme">
                                GET IN TOUCH
                            </p>
                        </Link>
                        <p className="uppercase text-sm font-semibold text-theme">
                            {product.category}
                        </p>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                        {product.title}
                    </h1>
                    <p className="text-base md:text-lg  leading-relaxed">
                        {product.description}
                    </p>
                </motion.div>
            </div>

            {/* Benefits */}
            <div className="max-w-6xl mx-auto px-6 mt-16">
                <h2 className="text-2xl font-bold mb-6">Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="p-6  rounded-lg shadow-sm border border-[var(--color-border)]"
                        >
                            <p className="font-medium">{b}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Ingredients */}
            <div className="max-w-6xl mx-auto px-6 mt-16">
                <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm ">
                    {product.ingredients.map((ing, i) => (
                        <li
                            key={i}
                            className="p-3  rounded-md shadow-sm border border-[var(--color-border)]"
                        >
                            ✅ {ing}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
