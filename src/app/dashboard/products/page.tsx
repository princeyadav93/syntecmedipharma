'use client';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import SearchBar from '@/components/SearchBar';
import AdminHeader from '@/components/admin/products/AdminHeader';
import StatsCards from '@/components/admin/products/StatsCards';
import ProductFilters from '@/components/admin/products/ProductFilters';
import AdminProductCard from '@/components/admin/products/AdminProductCard';
import EditProductModal from '@/components/admin/products/EditProductModal';
import { useProductStore } from '@/store/useProductStore';
import LogOutComp from '@/components/LogOutComp';

export default function AdminProductsPage() {
    const {
        products,
        query,
        category,
        publishFilter,
        visibleCount,
        viewMode,
        showMobileFilters,
        editingProduct,
        setQuery,
        setCategory,
        setPublishFilter,
        setVisibleCount,
        setViewMode,
        setShowMobileFilters,
        setEditingProduct,
        fetchProducts,
        togglePublish,
        deleteProduct,
        updateProduct,
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
        const matchesPublish =
            publishFilter === 'all' ||
            (publishFilter === 'published' && p.publish) ||
            (publishFilter === 'unpublished' && !p.publish);

        return matchesCategory && matchesSearch && matchesPublish;
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
        const node = loadMoreRef.current; // ✅ capture it at the start
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) incrementVisibleCount();
            },
            { threshold: 1.0 }
        );

        observer.observe(node);

        return () => {
            observer.unobserve(node); // ✅ cleanup uses same node
        };
    }, [filtered, incrementVisibleCount]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <LogOutComp />
            <AdminHeader viewMode={viewMode} setViewMode={setViewMode} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading && products.length === 0 ? (
                    <div className="py-8 text-center text-blue-600 font-medium">
                        Fetching products...
                    </div>
                ) : (
                    <>
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
                                        onClick={() =>
                                            setShowMobileFilters(true)
                                        }
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

                                {loading && products.length > 0 && (
                                    <div className="py-4 text-center text-gray-500">
                                        Loading more...
                                    </div>
                                )}

                                {visibleCount < filtered.length && !loading && (
                                    <div
                                        ref={loadMoreRef}
                                        className="py-6 text-center text-gray-500"
                                    >
                                        Scroll to load more...
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
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
