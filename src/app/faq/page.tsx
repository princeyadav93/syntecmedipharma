'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
    {
        question: 'What is Ayurveda?',
        answer: 'Ayurveda is a traditional system of medicine from India that emphasizes balance of mind, body, and spirit using herbs, diet, and lifestyle practices.',
    },
    {
        question: 'Are Saugvan Ayurveda medicines safe?',
        answer: 'Yes. All our Ayurvedic medicines are prepared using natural herbs and ingredients. We avoid harmful chemicals and follow safety standards to ensure effectiveness and purity.',
    },
    {
        question: 'Do Ayurvedic medicines have side effects?',
        answer: 'Most Ayurvedic medicines are gentle and natural when used as directed. However, like all medicines, some herbs may not be suitable for everyone. Please consult with a healthcare professional if you have medical concerns.',
    },
    {
        question: 'How do I place an order?',
        answer: 'All our orders are online only. Submit our form and our Ayurveda team will contact you shortly. We do not accept offline purchases for now.',
    },
    {
        question: 'Do you ship everywhere in India?',
        answer: 'Yes. We provide home delivery across India through our trusted courier partners.',
    },
    {
        question: 'How long will delivery take?',
        answer: 'Delivery usually takes 3–5 business days in metro cities and 5–7 days in other areas. In some cases, remote locations may take 7–10 days.',
    },
    {
        question: 'Do you allow Cash on Delivery (COD)?',
        answer: 'Currently, we accept only online payments to ensure safe and quick processing of orders.',
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-6">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Frequently Asked Questions
                    </h1>
                    <p>
                        Answers to some common questions about Saugvan Ayurveda
                        and our services.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="border border-[var(--color-border)]  rounded-lg overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full cursor-pointer flex justify-between items-center p-4 text-left 
                           font-medium "
                            >
                                {faq.question}
                                <span>{openIndex === index ? '−' : '+'}</span>
                            </button>

                            {openIndex === index && (
                                <div className="px-4 pb-4 text-sm ">
                                    {faq.answer}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
