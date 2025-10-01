'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
    // Base transition configuration for all animated elements
    const staggerTransition = { duration: 0.6 };

    // Initial hidden state for fade-in-up animation
    const initialProps = { opacity: 0, y: 30 };

    // Visible state for all elements
    const whileInViewProps = { opacity: 1, y: 0 };

    // Reusable viewport configuration
    const viewportConfig = { once: true, amount: 0.2 };

    // Content Structure (Placeholder T&C for a B2B Pharma Distributor)
    const termsSections = [
        {
            title: '1. Acceptance of Terms',
            content: [
                'By placing an order or using the wholesale distribution services provided by Syntec Medi Pharma (“we,” “our,” or “us”), you (“Client,” “Wholesaler,” or “Doctor”) agree to be bound by these Terms and Conditions. These terms govern all sales and services between Syntec Medi Pharma and its professional clients.',
                'The Client confirms that they are a duly licensed entity (wholesaler or registered medical practitioner) authorized to purchase and dispense pharmaceutical products.',
            ],
        },
        {
            title: '2. Ordering and Sales',
            content: [
                '**A. Product Information:** While we strive to ensure a reliable and efficient supply of **quality medicines**, all product descriptions, pricing, and availability are subject to change without prior notice.',
                '**B. Order Placement:** All orders must be placed through an approved method (e.g., telephone, email: syntecmedipharma@gmail.com). We reserve the right to accept or reject any order at our sole discretion, particularly concerning stock limitations.',
                '**C. Pricing:** Prices are quoted ex-warehouse unless otherwise specified and exclude applicable taxes and delivery charges (where not included in the agreement).',
            ],
        },
        {
            title: '3. Delivery and Risk',
            content: [
                '**A. Delivery Times:** We guarantee consistent stock and make sure the right products reach you **right on time**. However, all delivery dates are estimates and are contingent upon unforeseen circumstances. Syntec Medi Pharma is not liable for delays.',
                "**B. Risk Transfer:** Risk of loss or damage to products passes to the Client upon delivery to the Client’s specified address or upon collection by the Client's nominated carrier.",
                '**C. Inspection:** The Client must inspect goods immediately upon receipt and notify Syntec Medi Pharma of any shortages or visible damages within 24 hours of delivery.',
            ],
        },
        {
            title: '4. Payment Terms',
            content: [
                '**A. Payment:** Unless otherwise agreed in writing, payment for goods is due upon delivery or within the payment terms specified on the invoice.',
                '**B. Default:** Failure to make payments within the agreed terms may result in the suspension of future deliveries and the imposition of late payment fees.',
                '**C. Corporate Details:** Payments must be directed to the account associated with our corporate details: Shop No. 4 Sumer Complex, Nawada, Naharpur Road, Gurugram, Haryana 122001.',
            ],
        },
        {
            title: '5. Returns and Cancellations',
            content: [
                'Due to the sensitive nature of pharmaceutical products, returns are generally not accepted except in the case of verified damage during shipping or incorrect item fulfillment. Any return request must be authorized in advance by Syntec Medi Pharma.',
                'Order cancellation requests must be made immediately and are only guaranteed if the order has not yet been dispatched from our warehouse.',
            ],
        },
        {
            title: '6. Limitation of Liability',
            content: [
                "Syntec Medi Pharma's liability for any claim arising from the sale of goods or provision of services shall be limited to the purchase price of the specific goods in question. We shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the products.",
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
                        Terms & Conditions
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Governing the Purchase and Distribution Services of
                        Syntec Medi Pharma.
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Effective Date: October 2025
                    </p>
                </motion.div>

                {/* Policy Content Sections */}
                <div className="mt-12 space-y-10">
                    {termsSections.map((section, index) => (
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

                {/* Contact Information Section (Section 7) */}
                <motion.div
                    className="mt-12 pt-10 border-t border-gray-300"
                    initial={initialProps}
                    animate={whileInViewProps}
                    transition={{ ...staggerTransition }}
                    viewport={viewportConfig}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        7. Contact Information
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        For questions or concerns regarding these Terms and
                        Conditions, please reach out to us:
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
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

TermsAndConditions;
