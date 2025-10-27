'use client';
import { Grid, List, Package, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader({
    viewMode,
    setViewMode,
}: {
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
}) {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 mt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between h-auto min-h-16 py-2 gap-3">
                    {/* Left Section */}
                    <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-8 h-8 bg-theme rounded-lg flex items-center justify-center shrink-0">
                            <Package className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                            Product Management
                        </h1>
                    </div>

                    {/* Right Section */}

                    <div className="flex items-center space-x-3 w-full sm:w-auto justify-end flex-wrap gap-2">
                        <Link href="/dashboard/add-product/">
                            <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-theme text-white rounded-lg  cursor-pointer shadow-sm hover:shadow-md text-sm sm:text-base">
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                                <span className="hidden sm:inline">
                                    &nbsp;Product
                                </span>
                            </button>
                        </Link>

                        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 ">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all cursor-pointer ${
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
