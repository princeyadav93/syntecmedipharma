'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                window.location.href = '/dashboard'; // Protected dashboard
            } else {
                setMsg(data.error);
            }
        } catch (error) {
            console.log(error);
            setMsg('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-bg-100">
            <form
                onSubmit={handleLogin}
                className="bg-alternate p-6 rounded shadow w-96 space-y-4"
            >
                <h1 className="text-xl font-bold">Admin Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                    autoComplete="email"
                    required
                />
                <input
                    type={showCode ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    autoComplete="current-password"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="ml-2 text-sm text-blue-600 cursor-pointer"
                >
                    {showCode ? 'Hide' : 'Show'}
                </button>
                {msg && <p className="text-red-500 text-sm">{msg}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className={`${
                        loading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 cursor-pointer'
                    } w-full text-white p-2 rounded flex items-center justify-center`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
