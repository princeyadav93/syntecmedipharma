import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Lato, Playfair_Display } from 'next/font/google';
import WhatsAppButton from '@/components/WhatsAppButton';

const lato = Lato({
    subsets: ['latin'],
    variable: '--font-lato',
    weight: ['400', '700'], // regular + bold
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: 'Syntec Medipharma',
    description:
        'Licensed B2B pharma wholesaler supplying authentic allopathic medicines to chemists and clinics—batch‑verified stock, competitive bulk pricing, and fast nationwide delivery.',
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon-16x16.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            url: '/android-chrome-192x192.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '512x512',
            url: '/android-chrome-512x512.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: '/apple-touch-icon.png',
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
            <body
                className={`${lato.variable} ${playfair.variable} antialiased`}
            >
                <Header />
                <main>{children}</main>
                <WhatsAppButton />
                <Footer />
            </body>
        </html>
    );
}
