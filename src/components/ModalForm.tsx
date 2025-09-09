'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface FormData {
    name: string;
    address: string;
    pincode: string;
    phone: string;
    consent: boolean;
}

export default function ModalForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        address: '',
        pincode: '',
        consent: false,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target;
        const { name, value } = target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                target instanceof HTMLInputElement && target.type === 'checkbox'
                    ? target.checked
                    : value,
        }));
    };

    const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow digits and limit to 6 characters
        if (/^\d{0,6}$/.test(value)) {
            handleChange(e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // validate phone number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            setMessage('❌ Please enter a valid 10-digit phone number.');
            setLoading(false);
            return;
        }

        // Optional: validate pincode (if entered)
        if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
            setMessage('❌ Please enter a valid 6-digit PIN code.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // success state
            setIsSubmitted(true);
            setMessage(''); // clear inline msg
            setFormData({
                name: '',
                phone: '',
                address: '',
                pincode: '',
                consent: false,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(`❌ ${error.message}`);
            } else {
                setMessage('❌ Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    // Open modal after 5s on first visit
    useEffect(() => {
        const hasVisited = localStorage.getItem('visited');
        if (!hasVisited) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem('visited', 'true');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Prevent scroll when modal open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Auto-close modal after success
    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setIsOpen(false);
                setIsSubmitted(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                >
                    <div className="bg-bg px-12 py-6 rounded-lg w-full max-w-md shadow-lg">
                        {!isSubmitted ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <p
                                        className="text-green-600 font-semibold uppercase text-xs tracking-wide mb-2"
                                        id="contact"
                                    >
                                        Get in Touch
                                    </p>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="cursor-pointer"
                                    >
                                        <XMarkIcon className="h-6 w-6 text-green-500 hover:text-green-600" />
                                    </button>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold mb-4">
                                    We&apos;re here to assist you!
                                </h2>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-3"
                                >
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your name"
                                            className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Phone number{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your number"
                                            className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Address <span>(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter your address"
                                            className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                        />
                                    </div>

                                    {/* Pin Code */}
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Pin Code <span>(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handlePincodeChange}
                                            placeholder="Enter your PIN code"
                                            inputMode="numeric"
                                            pattern="\d{6}"
                                            maxLength={6}
                                            className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                        />
                                    </div>

                                    {/* Consent */}
                                    <div className="flex items-start text-xs">
                                        <input
                                            id="consent"
                                            name="consent"
                                            type="checkbox"
                                            checked={formData.consent}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 h-3 w-3 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                        />
                                        <label
                                            htmlFor="consent"
                                            className="ml-2 leading-snug"
                                        >
                                            I allow this website to store my
                                            submission so they can respond.
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loading}
                                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300 text-sm disabled:opacity-50"
                                    >
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </motion.button>
                                </form>
                                {message && (
                                    <p className="mt-3 text-sm text-red-600">
                                        {message}
                                    </p>
                                )}
                            </>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.25 }} // 🔥 nice zoom-out effect
                                className="bg-bg"
                            >
                                <h2 className="text-2xl text-center font-bold text-green-700">
                                    Thank you!
                                </h2>
                                <p className="mt-3">
                                    We&apos;ve received your details and our
                                    Ayurveda team will contact you shortly.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
