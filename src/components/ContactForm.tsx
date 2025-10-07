'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

interface FormData {
    name: string;
    address: string;
    pincode: string; // Changed from email to pincode
    phone: string;
    consent: boolean;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        address: '',
        phone: '',
        pincode: '', // Changed from email to pincode
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // validate phone number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            setMessage('Please enter a valid 10-digit phone number.');
            setLoading(false);
            return;
        }

        // Optional: validate pincode (if you want to enforce 6-digit Indian pincode)
        if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
            setMessage('Please enter a valid 6-digit PIN code.');
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
            setIsSubmitted(true);
            setFormData({
                name: '',
                address: '',
                phone: '',
                pincode: '', // Changed from email to pincode
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

    return (
        <section className="w-full bg-bg py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left - Form */}
                {!isSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <p
                            className="font-semibold uppercase text-xs tracking-wide mb-2"
                            id="contact"
                        >
                            Get in Touch
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-text mb-4">
                            We&apos;re here to assist you!
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Name */}
                            <div>
                                <label className="block text-sm mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                    className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1b2636] text-sm"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm mb-1">
                                    Phone number{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your number"
                                    className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1b2636] text-sm"
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
                                    className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1b2636] text-sm"
                                />
                            </div>

                            {/* Pin Code - Updated field */}
                            <div>
                                <label className="block text-sm mb-1">
                                    Pin Code <span>(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Only allow digits and limit to 6 characters
                                        if (/^\d{0,6}$/.test(value)) {
                                            handleChange(e);
                                        }
                                    }}
                                    placeholder="Enter your PIN code"
                                    inputMode="numeric"
                                    pattern="\d{6}"
                                    maxLength={6}
                                    className="w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1b2636] text-sm"
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
                                    className="mt-1 h-3 w-3 text-green-600 border-gray-300 rounded focus:ring-[#1b2636] cursor-pointer"
                                />
                                <label
                                    htmlFor="consent"
                                    className="ml-2 leading-snug cursor-pointer"
                                >
                                    I allow this website to store my submission
                                    so they can respond.
                                </label>
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className="w-full btn-primary text-white font-semibold py-2 rounded-md shadow-md text-sm disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </motion.button>
                        </form>

                        {/* Status Message */}
                        {message && <p className="mt-3 text-sm">{message}</p>}
                    </motion.div>
                ) : (
                    <div className="flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25 }} // 🔥 nice zoom-out effect
                            className="bg-bg"
                        >
                            <h2 className="text-2xl text-center font-bold">
                                Thank you!
                            </h2>
                            <p className="mt-3">
                                We&apos;ve received your details and our
                                Ayurveda team will contact you shortly.
                            </p>
                        </motion.div>
                    </div>
                )}

                {/* Right - Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="p-5 rounded-lg bg-alternate text-sm md:mt-4"
                >
                    <h3 className="text-base font-semibold mb-2 ">
                        Get in touch
                    </h3>
                    <p className="mb-3 flex gap-1 items-center">
                        <Mail className="w-5 h-5" />
                        <a
                            href="mailto:syntecmedipharma@gmail.com"
                            className="hover:underline"
                        >
                            syntecmedipharma@gmail.com
                        </a>
                    </p>
                    <p className="mb-3 flex gap-1">
                        <MapPin className="w-12 h-12 md:w-6 md:h-6" />
                        Shop No. 4 Sumer Complex, Nawada, Naharpur Road,
                        Gurugram, Haryana 122001
                    </p>
                    <div>
                        <h4 className="font-semibold mb-1">Hours</h4>
                        <ul className="space-y-0.5">
                            <li>Mon: 9:00am – 6:00pm</li>
                            <li>Tue: 9:00am – 6:00pm</li>
                            <li>Wed: 9:00am – 6:00pm</li>
                            <li>Thu: 9:00am – 6:00pm</li>
                            <li>Fri: 9:00am – 6:00pm</li>
                            <li>Sat: 9:00am – 6:00pm</li>
                            <li>Sun: Closed</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
