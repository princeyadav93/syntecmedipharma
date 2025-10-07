'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0e8b8b] shadow-sm transition-colors">
            <div className="max-w-7xl mx-auto px-3 py-2 md:px-6 md:py-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-2 md:gap-6">
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
                    <p className="text-sm text-white mt-2">
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
                    className="flex flex-wrap justify-center md:justify-end p-2 md:p-6 gap-6 text-sm "
                >
                    <li>
                        <Link
                            href="/faq"
                            className="hover:text-[#0B2137] text-white"
                        >
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/privacy-policy"
                            className="hover:text-[#0B2137] text-white"
                        >
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/terms-and-conditions"
                            className="hover:text-[#0B2137] text-white"
                        >
                            Terms and Conditions
                        </Link>
                    </li>
                </motion.ul>
            </div>
        </footer>
    );
}
