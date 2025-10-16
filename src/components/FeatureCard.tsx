'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
    title: string;
    description: string;
    image: string;
    href: string;
}

export default function FeatureCard({
    title,
    description,
    image,
    href,
}: FeatureCardProps) {
    return (
        <Link
            href={href}
            className="group relative block rounded-lg overflow-hidden shadow-md 
                  border-gray-200 dark:border-gray-700 
                 transition-shadow duration-300 hover:shadow-lg"
        >
            {/* Image */}
            <div className="relative w-full h-48 md:h-60 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-fill transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay effect */}
                <div
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg md:text-xl font-semibold  flex items-center text-theme-two">
                    {title}
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1 text-theme-two">
                        →
                    </span>
                </h3>
                <p className="mt-2 text-sm md:text-base line-clamp-4">
                    {description}
                </p>
            </div>
        </Link>
    );
}
