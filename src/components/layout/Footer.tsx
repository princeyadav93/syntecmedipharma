'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer-bg border-t border-gray-200 dark:border-gray-700 transition-colors">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                {/* Logo + Copyright */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center md:text-left"
                >
                    <Link href="/">
                        <img
                            alt="logo"
                            src="/images/nav-logo.svg"
                            width={110}
                            className=" object-contain lg:ml-6 fill-transparent"
                        />
                    </Link>
                    <p className="text-sm">
                        © {new Date().getFullYear()} Saugvan Ayurveda. All
                        rights reserved.
                    </p>
                </motion.div>

                {/* Links */}
                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center md:justify-end gap-6 text-sm"
                >
                    <li>
                        <Link href="/faq" className="hover:text-theme">
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/privacy-policy"
                            className="hover:text-theme"
                        >
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/terms-and-conditions"
                            className="hover:text-theme"
                        >
                            Terms and Conditions
                        </Link>
                    </li>
                </motion.ul>
            </div>
        </footer>
    );
}
