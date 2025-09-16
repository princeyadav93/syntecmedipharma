type Product = {
    id: number;
    brandName: string;
    composition: string;
    pack: string;
    type: 'Syrups' | 'Ayurvedic Syrups' | 'Dry Syrups';
    image: string;
    mrp: number;
    rate: number;
};

const products: Product[] = [
    {
        id: 1,
        brandName: 'Synteczyme',
        composition: 'Digestive Enzyme Formula',
        pack: '200ml',
        type: 'Syrups',
        image: '/images/saugvan.png',
        mrp: 120,
        rate: 95,
    },
    {
        id: 2,
        brandName: 'Herboheal',
        composition: 'Ayurvedic Liver Tonic',
        pack: '150ml',
        type: 'Ayurvedic Syrups',
        image: '/images/saugvan.png',
        mrp: 150,
        rate: 120,
    },
    {
        id: 3,
        brandName: 'Drymox',
        composition: 'Amoxicillin Dry Syrup',
        pack: '60ml',
        type: 'Dry Syrups',
        image: '/images/saugvan.png',
        mrp: 80,
        rate: 65,
    },
];

export default function ProductDetails({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id.toString() === params.id);

    if (!product) {
        return (
            <div className="p-10 text-center text-gray-500">
                Product not found.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6 flex justify-center">
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-start">
                {/* Left: Product Image */}
                <div className="bg-white border rounded-2xl shadow-lg p-8 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.brandName}
                        className="max-h-80 object-contain"
                    />
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        {product.brandName}
                    </h1>

                    <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold w-max ${
                            product.type === 'Syrups'
                                ? 'bg-rose-100 text-rose-700'
                                : product.type === 'Ayurvedic Syrups'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-sky-100 text-sky-700'
                        }`}
                    >
                        {product.type}
                    </span>

                    <p className="text-gray-700">
                        <strong>Composition:</strong> {product.composition}
                    </p>
                    <p className="text-gray-700">
                        <strong>Pack:</strong> {product.pack}
                    </p>
                    <p className="text-gray-700">
                        <strong>MRP:</strong> ₹{product.mrp}
                    </p>
                    <p className="text-gray-700">
                        <strong>Rate:</strong> ₹{product.rate}
                    </p>

                    <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition">
                        Contact for Order
                    </button>
                </div>
            </div>
        </main>
    );
}
