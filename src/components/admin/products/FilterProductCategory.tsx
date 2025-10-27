import React, { useMemo } from 'react';
import { useProductStore } from '@/store/useProductStore';

interface FilterProductCategoryProps {
    category: string;
    setCategory: (category: string) => void;
}

export default function FilterProductCategory({
    category,
    setCategory,
}: FilterProductCategoryProps) {
    const { products } = useProductStore();

    // Build categories dynamically from products
    const categories = useMemo(() => {
        const categoryMap: Record<string, number> = {};

        products.forEach((p) => {
            if (p.category) {
                categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
            }
        });

        // Transform into array for mapping
        const formatted = Object.entries(categoryMap).map(([value, count]) => ({
            value,
            label: value,
            count: count.toString(),
        }));

        // Add "All Products" to the beginning
        return [
            {
                value: 'All',
                label: 'All Products',
                count: products.length.toString(),
            },
            ...formatted,
        ];
    }, [products]);

    return (
        <div className="space-y-2">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                        category === cat.value
                            ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                            : 'bg-white/60 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-sm'
                    }`}
                >
                    <span className="font-medium capitalize">{cat.label}</span>
                    <span
                        className={`text-xs px-2 py-1 rounded-full  ${
                            category === cat.value
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        {cat.count}
                    </span>
                </button>
            ))}
        </div>
    );
}
