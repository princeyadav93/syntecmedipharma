'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();
    const [showCode, setShowCode] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        uniqueCode: '',
    });
    const [msg, setMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        // ✅ Client-side unique code check
        if (
            formData.uniqueCode !== process.env.NEXT_PUBLIC_SIGNUP_SECRET_CODE
        ) {
            setMsg('Invalid unique code (client check).');
            return;
        }

        const res = await fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
            setLoading(false);
            router.push('/dashboard/login');
        } else {
            setMsg(data.error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-bg-100">
            <form
                onSubmit={handleSubmit}
                className="bg-alternate p-6 rounded shadow w-96 space-y-4"
            >
                <h1 className="text-xl font-bold">Admin Sign Up</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type={showCode ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type={showCode ? 'text' : 'password'}
                    name="uniqueCode"
                    placeholder="Unique Code"
                    className="w-full p-2 border rounded"
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
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
