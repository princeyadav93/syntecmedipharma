'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
    title: string;
    subtitle?: string;
    image: string;
    buttonLabel?: string;
    buttonLink?: string;
}

export default function Hero({
    title,
    subtitle,
    image,
    buttonLabel,
    buttonLink,
}: HeroProps) {
    return (
        <section className="relative h-[450px] w-full flex items-center overflow-hidden">
            <div className="absolute  inset-0 -z-10">
                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <motion.div className="relative w-4xl mx-auto px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold text-white max-w-xl leading-tight"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {buttonLabel && buttonLink && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-6"
                    >
                        <Link href={buttonLink}>
                            <button className="btn-primary">
                                {buttonLabel}
                            </button>
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
