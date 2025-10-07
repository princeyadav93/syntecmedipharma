import { motion } from 'framer-motion';
import { Package, Tag, FileText } from 'lucide-react';
import type { Product } from '@/store/useProductStore';

interface ProductInfoProps {
    product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const discount = Math.round(
        ((product.mrp - product.price) / product.mrp) * 100
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 bg-white rounded-lg p-6"
        >
            {/* Brand and Category */}
            <div className="space-y-2">
                <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground mb-2">
                    <Tag className="w-3 h-3 mr-1" />
                    {product.category}
                </span>
                <h1 className="text-4xl font-bold text-brand">
                    {product.brandName}
                </h1>
            </div>

            {/* Composition */}
            <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="w-4 h-4" />
                <span className="text-sm">{product.composition}</span>
            </div>

            {/* Description */}
            {product.description && (
                <p className="text-foreground/80 leading-relaxed">
                    {product.description}
                </p>
            )}

            {/* Product Specifications */}
            <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Product Specifications
                </h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Package Size
                        </span>
                        <span className="font-medium">
                            {product.quantity} {product.unit}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Product ID
                        </span>
                        <span className="font-mono font-medium">
                            {product._id}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium">{product.category}</span>
                    </div>
                </div>
            </div>

            {/* Pricing Info */}
            <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-brand">
                        ₹{product.price}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                        ₹{product.mrp}
                    </span>
                    {discount > 0 && (
                        <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-semibold bg-destructive text-destructive-foreground">
                            {discount}% OFF
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    Bulk pricing available - Contact for details
                </p>
            </div>

            {/* CTA Buttons */}
            {/* <div className="space-y-3">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <button
                        className="w-full h-14 px-8 rounded-md text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg inline-flex items-center justify-center"
                        onClick={handleRequestQuote}
                    >
                        <Mail className="mr-2 h-5 w-5" />
                        Request a Quote
                    </button>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <button
                        className="w-full h-14 px-8 rounded-md text-lg font-semibold border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center justify-center"
                        onClick={handleContactSales}
                    >
                        <Phone className="mr-2 h-5 w-5" />
                        Contact Sales Team
                    </button>
                </motion.div>
            </div> */}

            {/* Availability Info */}
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Availability
                        </span>
                        <span className="font-medium text-success">
                            In Stock
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Minimum Order
                        </span>
                        <span className="font-medium">Contact for details</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Lead Time</span>
                        <span className="font-medium">2-3 business days</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
