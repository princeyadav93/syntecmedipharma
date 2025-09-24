'use client';
import { Filter, X } from 'lucide-react';
import FilterProductCategory from '@/components/FilterProductCategory';

export default function ProductFilters({
    category,
    setCategory,
    publishFilter,
    setPublishFilter,
    showMobileFilters,
    setShowMobileFilters,
}: {
    category: string;
    setCategory: (cat: string) => void;
    publishFilter: string;
    setPublishFilter: (filter: string) => void;
    showMobileFilters: boolean;
    setShowMobileFilters: (v: boolean) => void;
}) {
    return (
        <aside
            className={`lg:w-80 ${
                showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
        >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Filter className="h-5 w-5 mr-2" />
                        Filters
                    </h2>
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="lg:hidden p-1 hover:bg-gray-100 rounded-md"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-800">
                            Product Category
                        </h3>
                        <FilterProductCategory
                            category={category}
                            setCategory={setCategory}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-800">
                            Publication Status
                        </h3>
                        <select
                            value={publishFilter}
                            onChange={(e) => setPublishFilter(e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Products</option>
                            <option value="published">Published Only</option>
                            <option value="unpublished">
                                Unpublished Only
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </aside>
    );
}
