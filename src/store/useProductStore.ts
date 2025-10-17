import { create } from 'zustand';

export type ImageObject = {
    url: string;
    public_id: string;
};
export type Product = {
    _id: string;
    images: ImageObject[];
    brandName: string;
    composition: string;
    category: string;
    description?: string;
    quantity: number;
    unit: string;
    mrp: number;
    publish: boolean;
};

type ProductStore = {
    products: Product[];
    query: string;
    category: string;
    publishFilter: string;
    visibleCount: number;
    viewMode: 'grid' | 'list';
    showMobileFilters: boolean;
    editingProduct: Product | null;
    loading: boolean;
    error: string | null;

    // Actions
    setProducts: (products: Product[]) => void;
    fetchProducts: () => Promise<void>;
    setQuery: (query: string) => void;
    setCategory: (category: string) => void;
    setPublishFilter: (filter: string) => void;
    setVisibleCount: (count: number) => void;
    incrementVisibleCount: (step?: number) => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    setShowMobileFilters: (show: boolean) => void;
    setEditingProduct: (product: Product | null) => void;

    togglePublish: (id: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (updated: Product) => void;
    clearError: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    query: '',
    category: 'All',
    publishFilter: 'all',
    visibleCount: 6,
    viewMode: 'grid',
    showMobileFilters: false,
    editingProduct: null,
    loading: false,
    error: null,

    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
        try {
            set({ loading: true });
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            set({ products: data, error: null, loading: false });
        } catch (err: any) {
            set({
                error: err.message || 'Error fetching products',
                loading: false,
            });
        }
    },

    setQuery: (query) => set({ query }),
    setCategory: (category) => set({ category }),
    setPublishFilter: (filter) => set({ publishFilter: filter }),
    setVisibleCount: (count) => set({ visibleCount: count }),
    incrementVisibleCount: (step = 6) =>
        set((state) => ({
            visibleCount:
                state.visibleCount < state.products.length
                    ? state.visibleCount + step
                    : state.visibleCount,
        })),
    setViewMode: (mode) => set({ viewMode: mode }),
    setShowMobileFilters: (show) => set({ showMobileFilters: show }),
    setEditingProduct: (product) => set({ editingProduct: product }),

    togglePublish: async (id) => {
        try {
            set({ loading: true });
            const res = await fetch(`/api/products/${id}`, { method: 'PATCH' });
            if (!res.ok) throw new Error('Failed to toggle publish state');
            set((state) => ({
                products: state.products.map((p) =>
                    p._id === id ? { ...p, publish: !p.publish } : p
                ),
                error: null,
                loading: false,
            }));
        } catch (err: any) {
            set({
                error: err.message || 'Error toggling publish state',
                loading: false,
            });
        }
    },

    deleteProduct: async (id) => {
        try {
            set({ loading: true });
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete product');
            set((state) => ({
                products: state.products.filter((p) => p._id !== id),
                error: null,
                loading: false,
            }));
        } catch (err: any) {
            set({
                error: err.message || 'Error deleting product',
                loading: false,
            });
        }
    },

    updateProduct: (updated) =>
        set((state) => ({
            products: state.products.map((p) =>
                p._id === updated._id ? updated : p
            ),
            editingProduct: null,
            error: null,
        })),

    clearError: () => set({ error: null }),
}));
