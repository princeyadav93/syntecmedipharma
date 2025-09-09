'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <section className="min-h-screen bg-[var(--color-bg)] py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* 🟢 Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Terms &amp; Conditions
                    </h1>
                    <p>Last updated: March 2024</p>
                </motion.div>

                {/* 🟢 Content Sections */}
                <motion.div
                    className="space-y-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Introduction */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to{' '}
                            <span className="font-semibold text-theme">
                                Saugvan Ayurveda
                            </span>
                            . By accessing our website and using our services,
                            you agree to comply with and be bound by the
                            following Terms &amp; Conditions. If you do not
                            agree with any part of these, please do not use our
                            site.
                        </p>
                    </section>

                    {/* Use of Website */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            2. Use of Our Website
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                You must be at least 18 years old to purchase
                                products.
                            </li>
                            <li>
                                You agree not to misuse the content or disrupt
                                the website’s functionality.
                            </li>
                            <li>
                                All content is owned by Saugvan Ayurveda and may
                                not be reproduced without permission.
                            </li>
                        </ul>
                    </section>

                    {/* Products & Advice */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            3. Products &amp; Medical Advice
                        </h2>
                        <p>
                            Our Ayurvedic medicines and products are designed
                            for general wellness. They are not intended as a
                            substitute for professional medical advice. Please
                            consult your healthcare provider for any medical
                            concerns.
                        </p>
                    </section>

                    {/* Orders & Delivery */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            4. Orders &amp; Delivery
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                All orders must be placed online via our
                                website.
                            </li>
                            <li>We currently deliver only within India.</li>
                            <li>
                                Delivery typically takes 3–7 business days,
                                depending on your location.
                            </li>
                            <li>
                                We reserve the right to refuse or cancel orders
                                at our discretion.
                            </li>
                        </ul>
                    </section>

                    {/* Payments */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            5. Payments
                        </h2>
                        <p>
                            Payments must be made online through our secure
                            payment gateway. We do not currently accept Cash on
                            Delivery (COD).
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            6. Limitation of Liability
                        </h2>
                        <p>
                            Saugvan Ayurveda will not be liable for any damages
                            arising from the use or misuse of our products
                            beyond the extent permitted by law. By purchasing
                            our products, you accept responsibility for their
                            appropriate use.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            7. Changes to Terms
                        </h2>
                        <p>
                            We may update these Terms &amp; Conditions from time
                            to time. The latest version will always be available
                            on this page.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            8. Contact Us
                        </h2>
                        <p>
                            For any questions about these Terms, please contact
                            us at:
                        </p>
                        <p className="mt-2 text-theme font-semibold">
                            📧 support@saugvanayurveda.com
                            <br /> 📍 Sector 18, Noida, India
                        </p>
                    </section>
                </motion.div>
            </div>
        </section>
    );
}
