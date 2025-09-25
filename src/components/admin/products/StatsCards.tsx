import { Package } from 'lucide-react';
import { Product } from '@/store/useProductStore';

export default function StatsCards({ products }: { products: Product[] }) {
    const statsData = [
        { label: 'Total Products', value: products.length, color: 'blue' },
        {
            label: 'Published',
            value: products.filter((p) => p.publish).length,
            color: 'green',
        },
        {
            label: 'Unpublished',
            value: products.filter((p) => !p.publish).length,
            color: 'yellow',
        },
        { label: 'Categories', value: 3, color: 'purple' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                                {stat.label}
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {stat.value}
                            </p>
                        </div>
                        <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                                stat.color === 'blue'
                                    ? 'from-blue-500 to-blue-600'
                                    : stat.color === 'green'
                                    ? 'from-green-500 to-green-600'
                                    : stat.color === 'yellow'
                                    ? 'from-yellow-500 to-yellow-600'
                                    : 'from-purple-500 to-purple-600'
                            } flex items-center justify-center`}
                        >
                            <Package className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
