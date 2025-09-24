import React from 'react';

interface FilterProductCategoryProps {
    category: string;
    setCategory: (category: string) => void;
}

const categories = [
    { value: 'All', label: 'All Products', count: '∞' },
    { value: 'Syrups', label: 'Syrups', count: '24' },
    { value: 'Ayurvedic Syrups', label: 'Ayurvedic Syrups', count: '18' },
    { value: 'Dry Syrups', label: 'Dry Syrups', count: '12' },
];

export default function FilterProductCategory({
    category,
    setCategory,
}: FilterProductCategoryProps) {
    return (
        <div className="space-y-2">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        category === cat.value
                            ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                            : 'bg-white/60 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-sm'
                    }`}
                >
                    <span className="font-medium">{cat.label}</span>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
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
