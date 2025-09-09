'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
    return (
        <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* 🟢 Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-[var(--color-secondary)] dark:text-gray-300">
                        Last updated: March 2024
                    </p>
                </motion.div>

                {/* 🟢 Content */}
                <div className="space-y-8 text-[var(--color-secondary)] dark:text-gray-300 leading-relaxed">
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            1. Introduction
                        </h2>
                        <p>
                            At{' '}
                            <span className="font-semibold text-theme">
                                Saugvan Ayurveda
                            </span>
                            , your privacy is important to us. This Privacy
                            Policy explains how we collect, use, and protect
                            your personal information when you visit our website
                            or use our services.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            2. Information We Collect
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                Personal details like your name, email, and
                                phone number when you contact us.
                            </li>
                            <li>
                                Usage data such as pages visited, time spent,
                                and interactions with our site.
                            </li>
                            <li>
                                Technical information such as your IP address,
                                browser, and device type.
                            </li>
                        </ul>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            3. How We Use Your Information
                        </h2>
                        <p>We use your data to:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                Provide and improve our Ayurvedic products and
                                services.
                            </li>
                            <li>Respond to your questions and requests.</li>
                            <li>
                                Send updates, promotions, and wellness
                                information (if you opt in).
                            </li>
                            <li>
                                Ensure website security and prevent fraudulent
                                activity.
                            </li>
                        </ul>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            4. Sharing of Information
                        </h2>
                        <p>
                            We do not sell your personal information. We may
                            only share it with trusted service providers who
                            help us operate the website (such as hosting,
                            analytics, or email tools). All partners follow
                            strict confidentiality agreements.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            5. Data Security
                        </h2>
                        <p>
                            We implement strong technical and organizational
                            safeguards to keep your personal data secure.
                            However, please note that no method of transmission
                            over the Internet is 100% secure.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            6. Your Rights
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                Access, update, or delete your personal
                                information.
                            </li>
                            <li>
                                Opt out of receiving marketing communications at
                                any time.
                            </li>
                            <li>
                                Request more information about how we handle
                                your data by contacting us.
                            </li>
                        </ul>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            7. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy
                            or our data practices, please contact us at:
                        </p>
                        <p className="mt-2 text-theme font-semibold">
                            📧 support@saugvanayurveda.com
                            <br /> 📍 Sector 18, Noida, India
                        </p>
                    </motion.section>
                </div>
            </div>
        </section>
    );
}
