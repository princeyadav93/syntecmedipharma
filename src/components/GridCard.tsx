'use client';
import FeatureCard from './FeatureCard';

const features = [
    {
        title: 'Wide Range of Tablets',
        description:
            'Our tablets cover everything from essential generics to specialized formulations, ensuring consistent quality and effective treatment options for pharmacies and hospitals.',
        image: '/assets/tablets.jpg',
        href: '/products?category=tablets',
    },
    {
        title: 'Premium Soft Gels   ',
        description:
            ' Designed for better absorption and patient convenience, our soft gels and capsules meet the highest industry standards for safety and reliability',
        image: '/assets/gels.jpg',
        href: '/products?category=gels',
    },
    {
        title: 'Authentic Ayurvedic Syrups',
        description:
            'Combining ancient herbal wisdom with modern practices, our Ayurvedic syrups promote natural wellness while maintaining trusted purity and efficacy..',
        image: '/assets/syrups.jpg',
        href: '/products?category=syrups',
    },
    {
        title: 'Hard Gelatin Capsules',
        description:
            'Crafted for versatile dosing and maximum stability, our hard gelatin capsules provide precise pharmaceutical delivery in a convenient form. These capsules are manufactured to strict quality standards, ensuring reliable disintegration and absorption for a wide range of medications and supplements across pharmacy and hospital needs.',
        image: '/assets/hardgelatincapsules.jpg',
        href: '/products?category=hard gelatin capsules',
    },
    {
        title: 'Injections',
        description: `Engineered for safety and rapid action
                our injections deliver precise and reliable results
                for hospital and pharmacy needs.
                Trusted for effectiveness across all treatments.`,
        image: '/assets/injections.jpg',
        href: '/products?category=injections',
    },
    {
        title: 'Effective Topical Creams',
        description: `Formulated with precision and care, our range of topical creams delivers targeted relief and treatment for various skin conditions. Each formulation combines advanced pharmaceutical science with high-quality ingredients to ensure safety, efficacy, and patient comfort. Trusted by healthcare professionals for consistent performance and reliable results.`,
        image: '/assets/creams.jpg',
        href: '/products?category=creams',
    },
];

export default function GridCard() {
    return (
        <section className="w-full bg-[var(--color-bg)] mt-6 md:mt-12 text-[var(--color-text)]">
            <div className="max-w-7xl mx-auto px-6">
                <p
                    className="uppercase tracking-wider text-theme font-semibold text-sm"
                    id="products"
                >
                    OUR PRODUCT RANGE
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-8 text-theme-two">
                    Quality Medicines Across Every Category
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
