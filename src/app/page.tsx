import ContactForm from '@/components/ContactForm';
import FeatureSection from '@/components/FeatureSection';
import GridCard from '@/components/GridCard';
import Hero from '@/components/Hero';

export const metadata: Metadata = {
    title: 'Syntec Medipharma',
    description:
        'Licensed B2B pharma wholesaler supplying authentic and quality medicines to customers—batch‑verified stock, competitive bulk pricing, and fast nationwide delivery.',
};

export default function Home() {
    return (
        <>
            <Hero
                title="Trusted Wholesale Partner in Healthcare"
                subtitle="Providing quality medicines at competitive prices to pharmacies, hospitals, and distributors."
                image="/images/hero-image1.avif"
                buttonLabel="Explore Products"
                buttonLink="/#products"
            />
            <FeatureSection
                eyebrow="Quality Assured Pharmaceuticals"
                title="Reliable Wholesale Medicine Solutions for Your Business"
                description="At Syntec Medi Pharma, we are committed to being your trusted partner in healthcare distribution. We specialize in providing a wide range of high-quality medicines at competitive wholesale prices, supplying pharmacies, hospitals, and healthcare providers across the region. With a focus on reliability, authenticity, and timely delivery, we ensure that every product meets strict industry standards and regulations. Whether you need branded pharmaceuticals, generic medicines, or specialized healthcare products, Syntec Medi Pharma is here to support your business with consistency and care."
                linkLabel="Get in touch"
                linkHref="/#contact"
                image="/assets/section-1.avif"
                animationMode="animate"
            />
            <FeatureSection
                eyebrow="COMMITTED TO QUALITY"
                title="Authentic Medicines, Trusted Supply"
                description="At Syntec Medi Pharma, our wholesale medicines are sourced from certified manufacturers and go through rigorous quality checks to ensure safety, authenticity, and effectiveness. We partner with trusted suppliers to deliver reliable healthcare products that pharmacies, hospitals, and distributors can count on. With us, you get more than just medicines—you gain a dependable partner dedicated to your business growth and patient care."
                linkLabel="Learn"
                linkHref="/#contact"
                image="/assets/section-01.avif"
                imageLeft
                animationMode="whileInView"
            />
            <GridCard />
            <ContactForm />
        </>
    );
}
