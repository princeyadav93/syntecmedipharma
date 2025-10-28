'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import toast from 'react-hot-toast';
import UserFilterCategory from '@/components/UserFilterCategory';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
    const {
        products,
        query,
        category,
        publishFilter,
        visibleCount,
        setQuery,
        setCategory,
        setVisibleCount,
        fetchProducts,
        incrementVisibleCount,
        error,
        clearError,
    } = useProductStore();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const searchParams = useSearchParams();

    // Filtering logic
    const filtered = products.filter((p) => {
        const matchesCategory = category === 'All' || p.category === category;
        const matchesSearch =
            p.brandName.toLowerCase().includes(query.toLowerCase()) ||
            p.composition.toLowerCase().includes(query.toLowerCase());
        const isPublished = p.publish === true;
        return matchesCategory && matchesSearch && isPublished;
    });

    const visibleProducts = filtered.slice(0, visibleCount);

    useEffect(() => {
        setVisibleCount(6);
    }, [query, category, publishFilter, setVisibleCount]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        // ✅ Guard for client environment
        if (typeof window !== 'undefined') {
            const catFromQuery = searchParams.get('category');
            if (catFromQuery && catFromQuery !== category) {
                setCategory(catFromQuery);
            }
        }
    }, [searchParams, category, setCategory]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error, clearError]);

    useEffect(() => {
        const node = loadMoreRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) incrementVisibleCount();
            },
            { threshold: 1.0 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [filtered, incrementVisibleCount]);

    return (
        <main className="min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
                    Syntecmedipharma Products
                </h1>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <SearchBar value={query} onChange={setQuery} />
                    <UserFilterCategory
                        category={category}
                        setCategory={setCategory}
                    />
                </div>

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

                {visibleCount < filtered.length && (
                    <div ref={loadMoreRef} className="py-8 flex justify-center">
                        Loading more products...
                    </div>
                )}
            </div>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="text-center py-12">Loading products...</div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
