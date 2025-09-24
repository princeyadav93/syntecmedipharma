'use client';
import { Grid, List, Package, Plus } from 'lucide-react';

export default function AdminHeader({
    viewMode,
    setViewMode,
}: {
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
}) {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Product Management
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </button>

                        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${
                                    viewMode === 'grid'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${
                                    viewMode === 'list'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
