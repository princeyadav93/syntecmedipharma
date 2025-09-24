'use client';
import { useEffect, useRef, useState } from 'react';
// import { Package } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
// import FilterProductCategory from '@/components/FilterProductCategory';
import AdminHeader from '@/components/admin/products/AdminHeader';
import StatsCards from '@/components/admin/products/StatsCards';
import ProductFilters from '@/components/admin/products/ProductFilters';
import AdminProductCard from '@/components/admin/products/AdminProductCard';
import EditProductModal from '@/components/admin/products/EditProductModal';

import { Product, mockProducts } from '@/lib/mockProducts';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [publishFilter, setPublishFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Filtering logic
    const filtered = products.filter((p) => {
        const matchesCategory = category === 'All' || p.type === category;
        const matchesSearch =
            p.brandName.toLowerCase().includes(query.toLowerCase()) ||
            p.composition.toLowerCase().includes(query.toLowerCase());
        const matchesPublish =
            publishFilter === 'all' ||
            (publishFilter === 'published' && p.publish) ||
            (publishFilter === 'unpublished' && !p.publish);

        return matchesCategory && matchesSearch && matchesPublish;
    });

    const visibleProducts = filtered.slice(0, visibleCount);

    function fetchproducts() {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }

    // Reset visible when filters change
    useEffect(() => {
        setVisibleCount(6);
    }, [query, category, publishFilter]);

    useEffect(() => {
        fetchproducts();
    }, []);

    // Infinite scroll
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

    // Actions
    const togglePublish = (id: string) => {
        const res = async () =>
            fetch(`/api/products/${id}`, {
                method: 'PATCH',
            });
        res();
        console.log(res);
        // setProducts((prev) =>
        //     prev.map((p) => (p._id === id ? { ...p, publish: !p.publish } : p))
        // );
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    const updateProduct = (updated: Product) => {
        setProducts((prev) =>
            prev.map((p) => (p._id === updated._id ? updated : p))
        );
        setEditingProduct(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <AdminHeader viewMode={viewMode} setViewMode={setViewMode} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StatsCards products={products} />

                <div className="flex flex-col lg:flex-row gap-8">
                    <ProductFilters
                        category={category}
                        setCategory={setCategory}
                        publishFilter={publishFilter}
                        setPublishFilter={setPublishFilter}
                        showMobileFilters={showMobileFilters}
                        setShowMobileFilters={setShowMobileFilters}
                    />

                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <SearchBar
                                value={query}
                                onChange={setQuery}
                                placeholder="Search by brand name or composition..."
                            />
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden inline-flex items-center px-4 py-3 bg-white rounded-xl border"
                            >
                                Filters
                            </button>
                        </div>

                        {filtered.length === 0 ? (
                            <div>No products found.</div>
                        ) : (
                            <div
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                        : 'space-y-4'
                                }
                            >
                                {visibleProducts.map((product) => (
                                    <AdminProductCard
                                        key={product._id}
                                        product={product}
                                        onTogglePublish={togglePublish}
                                        onDelete={deleteProduct}
                                        onEdit={setEditingProduct}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>
                        )}

                        {visibleCount < filtered.length && (
                            <div
                                ref={loadMoreRef}
                                className="py-6 text-center text-gray-500"
                            >
                                Loading more...
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onSave={updateProduct}
                    onCancel={() => setEditingProduct(null)}
                />
            )}
        </div>
    );
}
