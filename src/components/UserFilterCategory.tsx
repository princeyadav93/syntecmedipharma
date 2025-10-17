import React, { useMemo } from 'react';
import { useProductStore } from '@/store/useProductStore';

interface FilterProductCategoryProps {
    category: string;
    setCategory: (category: string) => void;
}

export default function UserFilterCategory({
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
        <div className="w-full bg-white/60 rounded-xl">
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-[#0e8b8b] focus:border[#0e8b8b]"
            >
                {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                        {cat.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
