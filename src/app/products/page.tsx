'use client';

import { useEffect, useRef } from 'react';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import toast from 'react-hot-toast';
import UserFilterCategory from '@/components/UserFilterCategory';

export default function ProductsPage() {
    const {
        products,
        query,
        category,
        publishFilter,
        visibleCount,
        showMobileFilters,
        setQuery,
        setCategory,
        setVisibleCount,
        setShowMobileFilters,
        fetchProducts,
        incrementVisibleCount,
        loading,
        error,
        clearError,
    } = useProductStore();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Filtering logic
    const filtered = products.filter((p) => {
        const matchesCategory = category === 'All' || p.category === category;
        const matchesSearch =
            p.brandName.toLowerCase().includes(query.toLowerCase()) ||
            p.composition.toLowerCase().includes(query.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const visibleProducts = filtered.slice(0, visibleCount);

    // Reset visible count on filter changes
    useEffect(() => {
        setVisibleCount(6);
    }, [query, category, publishFilter, setVisibleCount]);

    // Load products on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Error → toast
    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error, clearError]);

    // Infinite scroll
    useEffect(() => {
        if (!loadMoreRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) incrementVisibleCount();
            },
            { threshold: 1.0 }
        );
        observer.observe(loadMoreRef.current);
        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [filtered, incrementVisibleCount]);

    return (
        <main className="min-h-screen py-12 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
                    Syntecmedipharma Products
                </h1>

                {/* Search + Filter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <SearchBar value={query} onChange={setQuery} />
                    <UserFilterCategory
                        category={category}
                        setCategory={setCategory}
                    />
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
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
