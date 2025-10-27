'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LogOut,
    LayoutDashboard,
    Package,
    PlusCircle,
    Loader2,
    User,
} from 'lucide-react';

// Define the primary color (Dark Teal)
const PRIMARY_COLOR = '#0e8b8b';
const PRIMARY_ACCENT_STYLE = { backgroundColor: PRIMARY_COLOR, color: 'white' };
const HOVER_ACCENT_STYLE = { backgroundColor: 'rgba(14, 139, 139, 0.1)' }; // Light transparent teal for hover

export default function LogOutComp() {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        await fetch('/api/auth/logout', { method: 'POST' });
        setLoading(false);
        router.push('/dashboard/login');
    };

    return (
        // Removed background color (bg-white is default/implied) and used subtle border for definition
        <div className="w-full shadow-md font-sans border-b border-gray-200 mb-6 bg-white">
            <nav className="container mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                {/* Left Section: Dashboard Title */}
                <div className="flex items-center gap-3 text-gray-900">
                    {/* Icon uses the accent color */}
                    <LayoutDashboard
                        className="w-6 h-6"
                        style={{ color: PRIMARY_COLOR }}
                    />
                    <h1 className="text-xl font-extrabold tracking-tight">
                        Admin Portal
                    </h1>
                </div>

                {/* Center Section: Navigation Links */}
                <div className="hidden md:flex gap-4">
                    {/* View Products Link - Text/Hover accent */}
                    <Link href="/dashboard/products" passHref>
                        <button
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-700 hover:text-gray-900 cursor-pointer"
                            style={HOVER_ACCENT_STYLE}
                        >
                            <Package className="w-4 h-4" />
                            View Products
                        </button>
                    </Link>

                    {/* Add Product Link - Solid accent button */}
                    <Link href="/dashboard/add-product" passHref>
                        <button
                            className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
                            // Using the primary color for the background
                            style={PRIMARY_ACCENT_STYLE}
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Product
                        </button>
                    </Link>
                </div>

                {/* Right Section: User Info and Logout */}
                <div className="flex items-center gap-4">
                    {/* User Info Badge */}
                    {user && (
                        <div className="text-sm font-medium flex items-center gap-2 px-3 py-1 text-gray-800 border border-gray-300 rounded-full bg-gray-50">
                            {/* User icon uses the accent color */}
                            <User
                                className="w-4 h-4"
                                style={{ color: PRIMARY_COLOR }}
                            />
                            <span className="capitalize hidden lg:inline">
                                {user.name}
                            </span>
                        </div>
                    )}

                    {/* Logout Button (High Contrast Red) */}
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className={`
                            flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 
                            ${
                                loading
                                    ? 'bg-red-400 text-white opacity-70 cursor-not-allowed'
                                    : 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
                            }
                        `}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <LogOut className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">
                            {loading ? 'Logging out...' : 'Logout'}
                        </span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
