'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureSectionProps {
    eyebrow?: string;
    title: string;
    description: string;
    linkLabel?: string;
    linkHref?: string;
    image: string;
    imageLeft?: boolean;
    animationMode: string;
}

export default function FeatureSection({
    eyebrow,
    title,
    description,
    linkLabel,
    linkHref,
    image,
    imageLeft = false,
    animationMode,
}: FeatureSectionProps) {
    if (animationMode === 'animate') {
        return (
            <section className="relative mt-6 md:mt-12 w-full bg-[var(--color-bg)] text-[var(--color-text)]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center px-6">
                    {imageLeft && (
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.4 }}
                            // 👇 on mobile → order-2 (image second), on md+ → order-1 (image first)
                            className="w-full flex justify-center md:justify-start order-2 md:order-1"
                        >
                            <motion.div className="relative w-72 h-80 md:w-96 md:h-[500px] [perspective:1000px]">
                                <Image
                                    src={image}
                                    alt={title}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    fill
                                    className="object-fill"
                                />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ✅ Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: imageLeft ? 40 : -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.4 }}
                        // 👇 If imageLeft: text first on mobile (`order-1`), text second on md+ (`order-2`)
                        className={`space-y-6 ${
                            imageLeft ? 'order-1 md:order-2' : 'order-1'
                        }`}
                    >
                        {eyebrow && (
                            <p className="uppercase tracking-wider text-theme font-semibold text-sm">
                                {eyebrow}
                            </p>
                        )}

                        <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                            {title}
                        </h2>

                        <p className="text-base md:text-lg leading-relaxed">
                            {description}
                        </p>

                        {linkLabel && linkHref && (
                            <Link
                                href={linkHref}
                                className="inline-block text-theme hover:underline font-medium"
                            >
                                {linkLabel}
                            </Link>
                        )}
                    </motion.div>

                    {/* 👇 If imageLeft = false → image second (right) */}
                    {!imageLeft && (
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="w-full flex justify-center md:justify-center order-2"
                        >
                            {/* Hover tilt effect */}
                            <motion.div className="relative w-72 h-80 md:w-96 [perspective:1000px]">
                                <Image
                                    src={image}
                                    alt={title}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    fill
                                    className="object-fill lg:ml-6"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </section>
        );
    }
    return (
        <section className="relative mt-6 md:mt-12 w-full bg-[var(--color-bg)] text-[var(--color-text)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center px-6">
                {imageLeft && (
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.4 }}
                        // 👇 on mobile → order-2 (image second), on md+ → order-1 (image first)
                        className="w-full flex justify-center md:justify-start order-2 md:order-1"
                    >
                        <motion.div className="relative w-72 h-80 md:w-96 [perspective:1000px]">
                            <Image
                                src={image}
                                alt={title}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                fill
                                className="object-fill"
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* ✅ Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: imageLeft ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    // 👇 If imageLeft: text first on mobile (`order-1`), text second on md+ (`order-2`)
                    className={`space-y-6 ${
                        imageLeft ? 'order-1 md:order-2' : 'order-1'
                    }`}
                >
                    {eyebrow && (
                        <p className="uppercase tracking-wider text-theme font-semibold text-sm">
                            {eyebrow}
                        </p>
                    )}

                    <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                        {title}
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed">
                        {description}
                    </p>

                    {linkLabel && linkHref && (
                        <Link
                            href={linkHref}
                            className="inline-block text-theme hover:underline font-medium"
                        >
                            {linkLabel}
                        </Link>
                    )}
                </motion.div>

                {/* 👇 If imageLeft = false → image second (right) */}
                {!imageLeft && (
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.4 }}
                        className="w-full flex justify-center md:justify-center order-2"
                    >
                        {/* Hover tilt effect */}
                        <motion.div className="relative w-72 h-80 md:w-96 md:h-[500px] [perspective:1000px]">
                            <Image
                                src={image}
                                alt={title}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                fill
                                className="object-contain lg:ml-6"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
