import ContactForm from '@/components/ContactForm';
import FeatureSection from '@/components/FeatureSection';
import GridCard from '@/components/GridCard';
import Hero from '@/components/Hero';
import ModalForm from '@/components/ModalForm';

export default function Home() {
    return (
        <>
            <ModalForm />
            <Hero
                title="Embrace natural wellness"
                subtitle="Discover the power of ayurveda"
                image="/images/saugvan.png"
                buttonLabel="View Products"
                buttonLink="/products"
            />
            <FeatureSection
                eyebrow="Embrace Wellness Naturally"
                title="Holistic ayurvedic solutions for you"
                description="At Saugvan Ayurveda, we believe in the power of nature to heal and restore balance. Our range of natural and holistic Ayurvedic products is designed to enhance your health and well-being. We draw from ancient wisdom and modern practices to create solutions that nurture your body, mind, and spirit. Our commitment to quality ensures that every product is crafted with care, using the finest ingredients sourced sustainably. Discover a path to wellness that resonates with your natural self."
                linkLabel="Get in touch"
                linkHref="/#contact"
                image="/images/earcare.webp"
                animationMode="animate"
            />
            <FeatureSection
                eyebrow="Crafted with Care"
                title="Sustainably sourced natural ingredients"
                description="All our herbal formulations are carefully designed using sustainably sourced, authentic Ayurvedic ingredients. We work closely with trusted growers to ensure the highest purity and potency."
                linkLabel="Learn"
                linkHref="/#contact"
                image="/images/earcare.webp"
                imageLeft
                animationMode="whileInView"
            />
            <GridCard />
            <ContactForm />
        </>
    );
}
