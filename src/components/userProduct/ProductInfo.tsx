import { motion } from 'framer-motion';
import { Package, Tag, FileText, CheckCircle } from 'lucide-react'; // Added CheckCircle
import type { Product } from '@/store/useProductStore';

interface ProductInfoProps {
    product: Product;
}

// Define the primary color constant
const PRIMARY_COLOR = '#0e8b8b';

export const ProductInfo = ({ product }: ProductInfoProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 bg-white rounded-xl shadow-lg p-8 border border-gray-100"
        >
            {/* Brand and Category - Elevated Header */}
            <div className="space-y-3 pb-4 border-b border-gray-200">
                <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                >
                    <Tag className="w-3 h-3 mr-1 opacity-80" />
                    {product.category.toUpperCase()}
                </span>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                    {product.brandName}
                </h1>

                {/* Composition */}
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Package className="w-4 h-4 text-gray-400" />
                    {product.composition}
                </div>
            </div>

            {/* Description */}
            {product.description && (
                <p className="text-gray-700 text-base leading-relaxed">
                    {product.description}
                </p>
            )}

            {/* Pricing Info - Bold and Prominent */}
            <div className="space-y-1 pt-2 pb-4">
                <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-gray-900">
                        ₹{product.mrp}
                    </span>
                    <span className="text-lg text-gray-500">MRP</span>
                </div>
                <p
                    className="text-sm font-semibold text-white inline-block px-3 py-1 rounded-full"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                >
                    Bulk pricing available - Contact for details
                </p>
            </div>

            {/* Product Specifications - Clean, Lined Table */}
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-5">
                <h3
                    className="font-bold mb-4 text-lg text-gray-800 flex items-center gap-2"
                    style={{ color: PRIMARY_COLOR }}
                >
                    <FileText className="w-5 h-5" />
                    Product Specifications
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2 border-gray-200">
                        <span className="text-gray-500">Package Size</span>
                        <span className="font-semibold text-gray-800">
                            {product.quantity} {product.unit}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-2 border-gray-200">
                        <span className="text-gray-500">Category</span>
                        <span className="font-semibold text-gray-800">
                            {product.category}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Brand</span>
                        <span className="font-semibold text-gray-800">
                            {product.brandName}
                        </span>
                    </div>
                </div>
            </div>

            {/* Availability Info - Highlighted Box */}
            <div className="p-4 rounded-lg bg-teal-50/50 border border-teal-200 text-sm">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-teal-600" />
                            Availability
                        </span>
                        <span className="font-bold text-teal-600">
                            In Stock
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Minimum Order</span>
                        <span className="font-semibold text-gray-800">
                            Contact for details
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Lead Time</span>
                        <span className="font-semibold text-gray-800">
                            2-3 business days
                        </span>
                    </div>
                </div>
            </div>

            {/* CTA Buttons (Uncommented and styled) */}
            {/* Note: You'll need to define handleRequestQuote and handleContactSales in the parent component or pass them down */}
            {/* For styling purposes, I'm assuming you have Mail and Phone icons available from lucide-react, which you had in your original comments. */}
            {/*
            <div className="space-y-4 pt-4">
                <motion.div
                    whileHover={{ scale: 1.01, boxShadow: '0 4px 15px rgba(14, 139, 139, 0.4)' }}
                    whileTap={{ scale: 0.99 }}
                >
                    <button
                        className="w-full h-12 px-8 rounded-lg text-lg font-bold text-white transition-colors shadow-xl inline-flex items-center justify-center"
                        style={{ backgroundColor: PRIMARY_COLOR, border: `2px solid ${PRIMARY_COLOR}` }}
                        // onClick={handleRequestQuote}
                    >
                        <Mail className="mr-3 h-5 w-5" />
                        Request a Quote
                    </button>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <button
                        className="w-full h-12 px-8 rounded-lg text-lg font-semibold border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                        // onClick={handleContactSales}
                    >
                        <Phone className="mr-3 h-5 w-5" />
                        Contact Sales Team
                    </button>
                </motion.div>
            </div>
            */}
        </motion.div>
    );
};
