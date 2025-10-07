'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
    // Base transition configuration for all animated elements
    const staggerTransition = { duration: 0.6 };

    // Initial hidden state for fade-in-up animation
    const initialProps = { opacity: 0, y: 30 };

    // Visible state for all elements
    const whileInViewProps = { opacity: 1, y: 0 };

    // Reusable viewport configuration
    const viewportConfig = { once: true, amount: 0.2 };

    // Content Structure (Placeholder Policy for a B2B Pharma Distributor)
    const policySections = [
        {
            title: '1. Introduction and Scope',
            content: [
                'Syntec Medi Pharma (' +
                    '“we,” “our,” or “us”' +
                    ') is committed to protecting the privacy and security of information obtained from our customers, including fellow wholesalers and registered doctors. This Privacy Policy describes how we collect, use, and protect the data you provide to us as part of our pharmaceutical distribution services.',
                'By engaging with our services, you agree to the practices described in this policy. This policy is primarily directed toward our professional clients and partners.',
            ],
        },
        {
            title: '2. Information We Collect',
            content: [
                'We collect necessary information to fulfill orders, ensure regulatory compliance, and facilitate communication. This includes:',
                '**A. Contact and Identification Data:** Name, professional title, wholesale license number, clinic/hospital address, delivery address, phone numbers (8929158671, 9211599689), and email address (syntecmedipharma@gmail.com).',
                '**B. Transactional Data:** Records of products ordered, order history, payment methods used (excluding full card details, which are handled by secure processors), and delivery tracking information.',
                '**C. Usage Data:** Information about how our clients interact with our ordering systems or websites, such as IP address, browser type, and access times, primarily for security and service improvement.',
            ],
        },
        {
            title: '3. How We Use Your Information',
            content: [
                'Your information is used solely for the efficient operation of our distribution service:',
                '**A. Order Fulfillment:** To process your orders, guarantee consistent stock, and ensure the right products reach you right on time.',
                '**B. Communication:** To respond to inquiries, provide updates on stock availability, delivery schedules, and regulatory changes.',
                '**C. Legal and Regulatory Compliance:** To maintain records required by pharmaceutical and government regulatory bodies (e.g., drug tracking, inventory audits).',
            ],
        },
        {
            title: '4. Data Sharing and Disclosure',
            content: [
                'We do not sell or rent your personal or professional data. We only share information when necessary to operate our business or fulfill legal requirements:',
                '**A. Delivery Partners:** Sharing contact and address details with trusted logistics companies to complete product delivery.',
                '**B. Legal Compliance:** Disclosing information when required by law, such as in response to a court order, subpoena, or government audit related to controlled substances or public health.',
                '**C. Professional Advisers:** Sharing information with auditors, lawyers, or professional consultants necessary for the management of our corporate office (Shop No. 4 Sumer Complex, Nawada, Naharpur Road, Gurugram, Haryana 122001).',
            ],
        },
        {
            title: '5. Data Security',
            content: [
                'We are dedicated to ensuring the security of your data. We implement technical and organizational measures to protect your information against unauthorized access, loss, or misuse. Our systems are constantly reviewed to ensure data integrity and confidentiality in line with our unwavering dedication to customer trust.',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 sm:py-24 font-sans">
            {/* Main Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    className="text-center pb-8 border-b border-indigo-200"
                    initial={initialProps}
                    animate={whileInViewProps}
                    transition={{ ...staggerTransition, delay: 0.1 }}
                    viewport={viewportConfig}
                >
                    <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Syntec Medi Pharma&apos;s Commitment to Data Security
                        and Confidentiality.
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Last Updated: October 2025
                    </p>
                </motion.div>

                {/* Policy Content Sections */}
                <div className="mt-12 space-y-10">
                    {policySections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500"
                            initial={initialProps}
                            animate={whileInViewProps}
                            transition={{
                                ...staggerTransition,
                            }}
                            viewport={viewportConfig}
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                {section.title}
                            </h2>
                            <div className="space-y-3 text-gray-600">
                                {section.content.map((paragraph, pIndex) => (
                                    <p
                                        key={pIndex}
                                        className="text-base leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: paragraph,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Information Section (Section 6) */}
                <motion.div
                    className="mt-12 pt-10 border-t border-gray-300"
                    initial={initialProps}
                    whileInView={whileInViewProps}
                    transition={{ ...staggerTransition, delay: 0.8 }}
                    viewport={viewportConfig}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        6. Contact Us
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        If you have any questions about this Privacy Policy or
                        our data practices, please contact us using the
                        information below:
                    </p>
                    <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
                        <p className="text-base text-gray-900">
                            <span className="font-semibold text-indigo-700">
                                Email:
                            </span>
                            <a
                                href="mailto:syntecmedipharma@gmail.com"
                                className="ml-2 hover:text-indigo-600"
                            >
                                syntecmedipharma@gmail.com
                            </a>
                        </p>
                        <p className="text-base text-gray-900">
                            <span className="font-semibold text-indigo-700">
                                Phone:
                            </span>
                            <span className="ml-2">
                                8929158671 / 9211599689
                            </span>
                        </p>
                        <p className="text-base text-gray-900">
                            <span className="font-semibold text-indigo-700">
                                Corporate Office:
                            </span>
                            <span className="ml-2">
                                Shop No. 4 Sumer Complex, Nawada, Naharpur Road,
                                Gurugram, Haryana 122001
                            </span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
