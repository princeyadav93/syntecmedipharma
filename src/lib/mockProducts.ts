// lib/mockProducts.ts
export type Product = {
    _id: string;
    images: string[];
    brandName: string;
    composition: string;
    description?: string;
    quantity: number;
    unit: string;
    mrp: number;
    price: number;
    publish: boolean;
    type: 'Syrups' | 'Ayurvedic Syrups' | 'Dry Syrups';
};

export const mockProducts: Product[] = [
    {
        _id: '1',
        images: [
            'https://images.pexels.com/photos/3683088/pexels-photo-3683088.jpeg',
        ],
        brandName: 'VitaMax Syrup',
        composition: 'Multivitamin & Minerals',
        description:
            'Complete nutritional supplement for daily health maintenance',
        quantity: 200,
        unit: 'ml',
        mrp: 250,
        price: 200,
        publish: true,
        type: 'Syrups',
    },
    {
        _id: '2',
        images: [
            'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg',
        ],
        brandName: 'Herbal Immunity',
        composition: 'Ashwagandha, Tulsi, Ginger',
        description: 'Natural ayurvedic formulation for immune system support',
        quantity: 150,
        unit: 'ml',
        mrp: 300,
        price: 250,
        publish: false,
        type: 'Ayurvedic Syrups',
    },
    {
        _id: '3',
        images: [
            'https://images.pexels.com/photos/3683051/pexels-photo-3683051.jpeg',
        ],
        brandName: 'Amoxicillin Dry Syrup',
        composition: 'Amoxicillin 250mg/5ml',
        description: 'Antibiotic dry syrup for bacterial infections',
        quantity: 30,
        unit: 'ml',
        mrp: 180,
        price: 150,
        publish: true,
        type: 'Dry Syrups',
    },
];
