'use client';

import { useEffect, useRef, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import FilterProductCategory from '@/components/FilterProductCategory';

type Product = {
    id: number;
    brandName: string;
    composition: string;
    pack: string;
    type: 'Syrups' | 'Ayurvedic Syrups' | 'Dry Syrups';
    image: string;
    mrp: number;
    rate: number;
};

const products: Product[] = [
    {
        id: 1,
        brandName: 'Synteczyme',
        composition: 'Digestive Enzyme Formula',
        pack: '200ml',
        type: 'Syrups',
        image: '/images/saugvan.png',
        mrp: 120,
        rate: 95,
    },
    {
        id: 2,
        brandName: 'Herboheal',
        composition: 'Ayurvedic Liver Tonic',
        pack: '150ml',
        type: 'Ayurvedic Syrups',
        image: '/images/saugvan.png',
        mrp: 150,
        rate: 120,
    },
    {
        id: 3,
        brandName: 'Drymox',
        composition: 'Amoxicillin Dry Syrup',
        pack: '60ml',
        type: 'Dry Syrups',
        image: '/images/saugvan.png',
        mrp: 80,
        rate: 65,
    },
    {
        id: 4,
        brandName: 'Drymox',
        composition: 'Amoxicillin Dry Syrup',
        pack: '60ml',
        type: 'Dry Syrups',
        image: '/images/saugvan.png',
        mrp: 80,
        rate: 65,
    },
    {
        id: 5,
        brandName: 'Drymox',
        composition: 'Amoxicillin Dry Syrup',
        pack: '60ml',
        type: 'Dry Syrups',
        image: '/images/saugvan.png',
        mrp: 80,
        rate: 65,
    },
    {
        id: 6,
        brandName: 'Drymox',
        composition: 'Amoxicillin Dry Syrup',
        pack: '60ml',
        type: 'Dry Syrups',
        image: '/images/saugvan.png',
        mrp: 80,
        rate: 65,
    },
    {
        id: 7,
        brandName: 'Drymox',
        composition: 'Amoxicillin Dry Syrup',
        pack: '60ml',
        type: 'Dry Syrups',
        image: '/images/saugvan.png',
        mrp: 80,
        rate: 65,
    },
    {
        id: 8,
        brandName: 'Drymox',
        composition: 'Amoxicillin Dry Syrup',
        pack: '60ml',
        type: 'Dry Syrups',
        image: '/images/saugvan.png',
        mrp: 80,
        rate: 65,
    },
];

export default function ProductsPage() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Filter products
    const filtered = products.filter((p) => {
        const matchesCategory = category === 'All' || p.type === category;
        const matchesSearch =
            p.brandName.toLowerCase().includes(query.toLowerCase()) ||
            p.composition.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visibleProducts = filtered.slice(0, visibleCount);

    // Reset visible count when search/category changes
    useEffect(() => {
        setVisibleCount(6);
    }, [query, category]);

    // Hook up infinite scrolling
    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) =>
                        prev < filtered.length ? prev + 6 : prev
                    );
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [filtered]);

    return (
        <main className="min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
                    Syntecmedipharma Products
                </h1>

                {/* Search + Filter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <SearchBar value={query} onChange={setQuery} />
                    <FilterProductCategory
                        category={category}
                        setCategory={setCategory}
                    />
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}

                    {filtered.length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-center col-span-full text-lg">
                            No products found.
                        </p>
                    )}
                </div>

                {/* Infinite Scroll Trigger */}
                {visibleCount < filtered.length && (
                    <div ref={loadMoreRef} className="py-8 flex justify-center">
                        Loading more products...
                    </div>
                )}
            </div>
        </main>
    );
}
