'use client';
import { useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { useProductStore } from '@/store/useProductStore';

const features = [
    {
        title: 'Wide Range of Tablets',
        description:
            'Our tablets cover everything from essential generics to specialized formulations, ensuring consistent quality and effective treatment options for pharmacies and hospitals.',
        image: '/assets/tablets.jpg',
        href: '/products?category=tablets',
    },
    {
        title: 'Authentic Syrups',
        description:
            'Authentic Syrups are scientifically formulated to provide effective relief and support faster recovery. Made with high-quality ingredients and precise composition, they ensure safe and reliable results for everyday wellness needs.',
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
        image: '/assets/creamss.jpg',
        href: '/products?category=creams',
    },
    {
        title: 'Premium Soft Gels   ',
        description:
            ' Designed for better absorption and patient convenience, our soft gels and capsules meet the highest industry standards for safety and reliability',
        image: '/assets/gels.jpg',
        href: '/products?category=Softgels',
    },
    {
        title: 'Medicated Soaps',
        description: `Our range of medicated soaps is specially formulated to help combat fungal and bacterial skin infections while keeping your skin clean, healthy, and refreshed. Enriched with clinically proven active ingredients, these soaps effectively treat conditions such as dandruff, ringworm, and other skin irritations. Ideal for everyday use, they gently cleanse while providing protection, promoting smoother and clearer skin. Perfect for maintaining hygiene and preventing infection.`,
        image: '/assets/soap.jpg',
        href: '/products?category=soaps',
    },
    {
        title: 'Advanced Probiotic Sachets',
        description: `Our range of pre and probiotic sachets is formulated to support a healthy digestive system and restore natural gut flora. Each sachet helps improve digestion, boost nutrient absorption, and strengthen immunity. Ideal for daily use to maintain digestive comfort and overall well-being.`,
        image: '/assets/sachets.avif',
        href: '/products?category=sachets',
    },
    {
        title: 'Refreshing Medicated Mouthwash',
        description: `Our range of medicated mouthwashes is formulated to ensure long-lasting freshness and protection against germs. They help reduce plaque, prevent bad breath, and maintain healthy gums. Ideal for daily oral care, these mouthwashes leave your mouth clean, refreshed, and protected.`,
        image: '/assets/mouthwashs.avif',
        href: '/products?category=mouthwash',
    },
    {
        title: 'Dry Syrups',
        description: `Dry syrups are powdered formulations that become liquid suspensions when mixed with a specific amount of water. They are commonly used for pediatric and geriatric patients who have difficulty swallowing tablets or capsules. These syrups ensure accurate dosing, extended shelf life, and improved palatability for better patient compliance.`,
        image: '/assets/drysyrup.avif',
        href: '/products?category=dry syrups',
    },
];

export default function GridCard() {
    const { fetchProducts } = useProductStore();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
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
