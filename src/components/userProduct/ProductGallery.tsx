'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export const ProductGallery = ({
    images,
    productName,
}: ProductGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedImage}
                        src={images[selectedImage]}
                        alt={`${productName} - Image ${selectedImage + 1}`}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg opacity-80 hover:opacity-100 transition-opacity hover:bg-secondary/80"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg opacity-80 hover:opacity-100 transition-opacity hover:bg-secondary/80"
                            onClick={nextImage}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {selectedImage + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImage === index
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-transparent hover:border-border'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.button>
                    ))}
                </div>
            )}
        </div>
    );
};
