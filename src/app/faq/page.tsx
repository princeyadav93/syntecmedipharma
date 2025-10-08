'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// 1. Define props interface for type safety
interface AccordionItemProps {
    title: string;
    content: string;
    delay: number;
}

// Component for a single FAQ item with an accordion style
// 2. Explicitly type the functional component
const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    content,
    delay,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // 3. Explicitly type variants using 'Variants' from framer-motion
    const itemVariants: Variants = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
    };

    const contentVariants: Variants = {
        collapsed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
        open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            className="border-b border-gray-200 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: delay }}
            variants={itemVariants}
        >
            {/* Question Title/Button */}
            <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span
                    className={`text-lg font-semibold ${
                        isOpen ? 'text-theme-two' : 'text-gray-800'
                    }`}
                >
                    {title}
                </span>
                <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-theme-two' : 'text-gray-400'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            {/* Answer Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={contentVariants}
                        className="px-6 pb-6 pt-0 text-gray-600"
                    >
                        <div className="border-t border-indigo-100 pt-4">
                            <p
                                className="text-base leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// 4. Type the main component and the data structure
const FAQ: React.FC = () => {
    // Reusable viewport configuration
    const viewportConfig = { once: true, amount: 0.2 };

    // Content Structure for FAQs
    const faqItems: AccordionItemProps[] = [
        {
            title: 'How can I place an order with Syntec Medi Pharma?',
            content:
                'Orders can be placed directly by calling our contact numbers **8929158671 / 9211599689** or by emailing your official purchase order to **syntecmedipharma@gmail.com**. We aim to make the ordering process efficient and reliable.',
            delay: 0.7,
        },
        {
            title: 'Do you guarantee product availability and consistent stock?',
            content:
                'Yes. Our core commitment is to be your dependable partner by **guaranteeing consistent stock** and ensuring a reliable supply of quality medicines and healthcare products. While demand can fluctuate, we maintain high inventory levels based on our **unwavering dedication** to timely supply.',
            delay: 0.8,
        },
        {
            title: 'What are your delivery standards and timelines?',
            content:
                'We strive to make sure the **right products reach fellow wholesalers and doctors right on time**. Delivery timelines are based on your location (Corporate Office location: Gurugram, Haryana) and the size of the order. Specific delivery schedules will be confirmed at the time of order placement.',
            delay: 0.9,
        },
        {
            title: 'Who is eligible to purchase from Syntec Medi Pharma?',
            content:
                'We operate as a **trusted pharmaceutical wholesale distributor**. Our services are exclusively for **fellow wholesalers and registered medical practitioners (Doctors)** who hold the necessary licenses and authorizations to purchase pharmaceutical products.',
            delay: 1.0,
        },
        {
            title: 'How do I update my corporate or contact information?',
            content:
                'Please contact our corporate office immediately via phone or email to update any contact or corporate license details. Our office is located at **Shop No. 4 Sumer Complex, Nawada, Naharpur Road, Gurugram, Haryana 122001**.',
            delay: 1.1,
        },
        {
            title: 'What is your policy on product returns?',
            content:
                'Due to regulatory and quality standards, returns are handled as outlined in our Terms & Conditions. Generally, returns are only accepted in cases of verifiable damage during transit or errors in fulfillment. Please contact us immediately if there is an issue with your received order.',
            delay: 1.2,
        },
    ];

    // Component structure uses a simple motion.div for the header, and maps over the FAQ items
    return (
        <div className="min-h-screen bg-gray-50 py-12 sm:py-24 font-sans">
            {/* Main Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    className="text-center pb-8 border-b border-theme"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={viewportConfig}
                >
                    <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-theme-two sm:text-5xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Quick answers regarding ordering, stock, and
                        distribution services.
                    </p>
                </motion.div>

                {/* FAQ Accordion List */}
                <div className="mt-12 space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            title={item.title}
                            content={item.content}
                            delay={item.delay}
                        />
                    ))}
                </div>

                {/* Closing Contact Prompt */}
                <motion.div
                    className="mt-12 text-center pt-8 border-t border-gray-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    viewport={viewportConfig}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Still Have Questions?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Don&apos;t hesitate to reach out to our team directly.
                    </p>
                    <p className="text-base text-theme-two font-semibold mt-1">
                        Call us at 8929158671 or Email us at
                        syntecmedipharma@gmail.com
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
