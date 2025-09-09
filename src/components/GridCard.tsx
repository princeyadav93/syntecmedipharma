'use client';
import FeatureCard from './FeatureCard';

const features = [
    {
        title: 'Herbal digestive tea',
        description: 'A soothing tea blend for digestive health.',
        image: '/images/saugvan.png',
        href: '/products/1',
    },
    {
        title: 'Calming essential oil blend',
        description: 'A serene blend for relaxation and peace.',
        image: '/images/saugvan.png',
        href: '/products/2',
    },
    {
        title: 'Natural skin nourishing cream',
        description: 'Hydrating cream for radiant skin.',
        image: '/images/saugvan.png',
        href: '/products/3',
    },
];

export default function GridCard() {
    return (
        <section className="w-full bg-[var(--color-bg)] text-[var(--color-text)]">
            <div className="max-w-7xl mx-auto px-6">
                <p
                    className="uppercase tracking-wider text-theme font-semibold text-sm"
                    id="products"
                >
                    Nature’s Remedies
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-8">
                    Discover holistic wellness solutions
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, idx) => (
                        <FeatureCard key={idx} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
}
