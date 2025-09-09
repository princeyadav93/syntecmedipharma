'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        <div className="flex flex-col">
            <h1 className="font-bold text-theme text-center">
                Admin Dashboard
            </h1>
            <nav className="p-4 flex justify-between items-center">
                <div>
                    {user && (
                        <p className="text-sm capitalize">
                            Welcome, {user.name}
                        </p>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    type="submit"
                    disabled={loading}
                    className={`${
                        loading
                            ? 'bg-red-400 cursor-not-allowed'
                            : 'bg-red-600 cursor-pointer'
                    } text-white px-4 py-2 rounded flex items-center justify-center hover:bg-red-700`}
                >
                    {loading ? 'Logging out...' : 'Logout'}
                </button>
            </nav>
        </div>
    );
}
