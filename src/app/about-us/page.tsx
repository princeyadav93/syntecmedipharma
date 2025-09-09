'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-12">
            <div className="max-w-6xl mx-auto px-6">
                {/* 🟢 Hero Section – always animates on page load */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }} // 👈 changed from whileInView
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="uppercase text-sm font-semibold text-theme">
                        About Us
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold leading-snug mt-2">
                        Welcome to{' '}
                        <span className="text-theme">Saugvan Ayurveda</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto">
                        At Saugvan Ayurveda, we believe in healing through
                        nature. For the past two years, we’ve been dedicated to
                        creating authentic Ayurvedic medicines that bring
                        balance, wellness, and care into your daily life.
                    </p>
                </motion.div>

                {/* 🟢 Company Info Grid – revealed on scroll */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg"
                    >
                        <Image
                            src="/images/earcare.webp"
                            alt="Saugvan Ayurveda Medicines"
                            priority
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold">Who We Are</h2>
                        <p className="leading-relaxed">
                            Founded in Noida, Sector 18, India,{' '}
                            <span className="font-semibold text-theme">
                                Saugvan Ayurveda
                            </span>{' '}
                            has been at the heart of natural wellness for 2
                            years. We specialize in Ayurvedic medicines rooted
                            in centuries of tradition, blended with modern
                            research to ensure purity and effectiveness.
                        </p>
                        <p className="leading-relaxed">
                            Our mission is simple: deliver safe, genuine, and
                            effective Ayurvedic products that enrich lives and
                            nurture holistic health.
                        </p>
                    </motion.div>
                </div>

                {/* 🟢 Milestones/Highlights – revealed on scroll */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
                >
                    <div className="p-6 bg-alternate rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-theme">2+</h3>
                        <p>Years Serving Wellness</p>
                    </div>
                    <div className="p-6 bg-alternate rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-theme">100%</h3>
                        <p>Natural Ayurvedic Products</p>
                    </div>
                    <div className="p-6 bg-alternate rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-theme">
                            Trusted
                        </h3>
                        <p>By Families in India</p>
                    </div>
                </motion.div>

                {/* 🟢 Location Section – revealed on scroll */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-20 text-center"
                >
                    <h2 className="text-2xl font-bold mb-4">
                        Where to Find Us
                    </h2>
                    <p className=" mb-2">
                        📍 Saugvan Ayurveda, Sector 18, Noida, India
                    </p>
                    <p>
                        We welcome you to explore the world of Ayurveda with us.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
