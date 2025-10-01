'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/#products' },
    { name: 'About Us', href: '/about-us' },
];

export default function NavBar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-indigo-400 sticky top-0 z-50 navbar-bg shadow-sm transition-colors">
            <div className="max-w-7xl mx-auto px-3 py-2 md:px-6 md:py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <img
                        alt="logo"
                        src="/images/nav-logo.svg"
                        width={110}
                        className=" object-contain w-[70px] md:w-[110px] lg:ml-6 fill-transparent"
                    />
                </Link>

                {/* Nav Links (Desktop) */}
                <ul className="hidden md:flex items-center space-x-8 ">
                    {navLinks.map(({ name, href }) => {
                        const isActive = pathname === href;
                        return (
                            <li key={name} className="relative">
                                <Link
                                    href={href}
                                    className={`transition-colors text-white ${
                                        isActive
                                            ? 'text-theme font-semibold'
                                            : ' hover:text-theme'
                                    }`}
                                >
                                    {name}
                                </Link>
                                {isActive && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 -bottom-1 w-full h-[2px] bg-theme"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Right Controls (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/#contact">
                        <span className="btn-primary dark:text-white cursor-pointer text-sm">
                            Contact Us
                        </span>
                    </Link>
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center space-x-3">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-1"
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? (
                            <XMarkIcon className="w-7 h-7 text-theme" />
                        ) : (
                            <Bars3Icon className="w-7 h-7 text-theme" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-0 h-1/2 -z-10 bg-bg flex flex-col items-center justify-center space-y-8"
                    >
                        <ul className="flex flex-col items-center space-y-6 text-xl">
                            {navLinks.map(({ name, href }) => (
                                <li key={name}>
                                    <Link
                                        href={href}
                                        onClick={() => setMenuOpen(false)}
                                        className="hover:text-theme transition-colors"
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/#contact"
                                    onClick={() => setMenuOpen(false)}
                                    className="btn-primary  px-6 py-2 rounded text-lg dark:text-white"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
