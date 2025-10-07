'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutUs = () => {
    // Base transition configuration for all animated elements
    // FIX: Removed 'type: "tween"' to resolve TypeScript compatibility error,
    // as 'tween' is the default type when 'duration' is provided.
    const staggerTransition = { duration: 0.3 };

    // Initial hidden state for fade-in-up animation
    const initialProps = { opacity: 0, y: 30 };

    // Visible state for all elements
    const whileInViewProps = { opacity: 1, y: 0 };

    return (
        <div className="min-h-screen bg-gray-50 py-12 sm:py-24 font-inter">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    className="text-center"
                    initial={initialProps}
                    animate={whileInViewProps}
                    transition={{ ...staggerTransition, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                        Our Mission & Commitment
                    </p>
                    <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Syntec Medi Pharma: Your Trusted Health Partner
                    </h1>
                </motion.div>

                {/* Core Value Proposition Section */}
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Image Placeholder (Optional) */}
                        <motion.div
                            className="rounded-xl shadow-2xl overflow-hidden w-fit"
                            initial={initialProps}
                            animate={whileInViewProps}
                            transition={{ ...staggerTransition, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Image
                                width={500}
                                height={500}
                                alt="Syntec Medi Pharma - Your Trusted Health Partner"
                                src="/assets/tablet-2.avif"
                            />
                        </motion.div>

                        {/* Text Content */}
                        <div className="space-y-6">
                            <motion.h2
                                className="text-2xl font-bold text-gray-900"
                                initial={initialProps}
                                animate={whileInViewProps}
                                transition={{
                                    ...staggerTransition,
                                    delay: 0.3,
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                Dedication, Enthusiasm, and Effort
                            </motion.h2>

                            <motion.p
                                className="text-lg text-gray-600"
                                initial={initialProps}
                                animate={whileInViewProps}
                                transition={{
                                    ...staggerTransition,
                                    delay: 0.5,
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                Syntec Medi Pharma was built upon **unwavering
                                dedication**, **energized enthusiasm**, and
                                **tireless effort**—all focused on one goal:
                                **complete customer satisfaction**. This core
                                philosophy drives every operation, from sourcing
                                to final delivery.
                            </motion.p>

                            <motion.p
                                className="text-lg text-gray-600 font-medium border-l-4 border-indigo-500 pl-4 py-1 rounded-sm shadow-sm"
                                initial={initialProps}
                                animate={whileInViewProps}
                                transition={{
                                    ...staggerTransition,
                                    delay: 0.2,
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                We are more than just a distributor; we are a
                                vital link in the healthcare supply chain,
                                committed to reliability and quality in every
                                transaction.
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Distributor Focus Section (Key Pillars) */}
                <div className="mt-20 pt-10">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-12"
                        initial={initialProps}
                        whileInView={whileInViewProps}
                        transition={{ ...staggerTransition, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Your Reliable Pharmaceutical Wholesale Distributor
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            We ensure the right products reach fellow
                            wholesalers and doctors right on time.
                        </p>
                    </motion.div>

                    {/* Key Pillars - Grid Layout */}
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        {/* Pillar 1: Reliable Supply */}
                        <motion.div
                            className="relative bg-white border-t-4 border-indigo-500 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                            initial={initialProps}
                            whileInView={whileInViewProps}
                            transition={{ ...staggerTransition, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white shadow-lg">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m4 10v6m8-6v6m-4 0v-6"
                                        />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    Consistent Stock Guarantee
                                </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                                Dedicated to ensuring consistent stock and
                                reliable, efficient supply of quality medicines
                                and healthcare products.
                            </dd>
                        </motion.div>

                        {/* Pillar 2: Quality Assurance */}
                        <motion.div
                            className="relative bg-white border-t-4 border-indigo-500 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                            initial={initialProps}
                            whileInView={whileInViewProps}
                            transition={{ ...staggerTransition, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white shadow-lg">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.275a1.125 1.125 0 011.237-.159l.775.388-1.782 1.782-2.152 2.152L17.75 9.75l-4.249-4.249-.775-.388a1.125 1.125 0 01-.161-1.237zM4.5 19.5h15"
                                        />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    Quality Assurance
                                </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                                We operate as a trusted pharmaceutical wholesale
                                distributor, dedicated to supplying only
                                quality, verified medicines.
                            </dd>
                        </motion.div>

                        {/* Pillar 3: Timely Delivery */}
                        <motion.div
                            className="relative bg-white border-t-4 border-indigo-500 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                            initial={initialProps}
                            whileInView={whileInViewProps}
                            transition={{ ...staggerTransition, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white shadow-lg">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    Dependable Partnership
                                </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                                Our goal is to be your dependable partner by
                                making sure the right products reach our clients
                                right on time.
                            </dd>
                        </motion.div>
                    </dl>
                </div>

                {/* Contact/Corporate Info Section */}
                <motion.div
                    className="mt-20 pt-10 bg-white rounded-xl shadow-md p-6 sm:p-10 border-t-4 border-indigo-500"
                    initial={initialProps}
                    whileInView={whileInViewProps}
                    transition={{ ...staggerTransition, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Connect with Syntec Medi Pharma
                    </h2>
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <dt className="text-sm font-semibold text-indigo-700">
                                Corporate Office
                            </dt>
                            <dd className="mt-1 text-base text-gray-900">
                                Shop No. 4 Sumer Complex, Nawada, Naharpur Road,
                                <br />
                                Gurugram, Haryana 122001
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-semibold text-indigo-700">
                                Contact Numbers
                            </dt>
                            <dd className="mt-1 text-base text-gray-900 space-y-1">
                                <a
                                    href="tel:8929158671"
                                    className="hover:text-indigo-600 transition block"
                                >
                                    📞 8929158671
                                </a>
                                <a
                                    href="tel:9211599689"
                                    className="hover:text-indigo-600 transition block"
                                >
                                    📞 9211599689
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-semibold text-indigo-700">
                                Email Address
                            </dt>
                            <dd className="mt-1 text-base text-gray-900">
                                <a
                                    href="mailto:syntecmedipharma@gmail.com"
                                    className="hover:text-indigo-600 transition"
                                >
                                    📧 syntecmedipharma@gmail.com
                                </a>
                            </dd>
                        </div>
                    </dl>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
