type Props = {
    category: string;
    setCategory: (cat: string) => void;
};

const categories = ['All', 'Syrups', 'Ayurvedic Syrups', 'Dry Syrups'];

export default function FilterProductCategory({
    category,
    setCategory,
}: Props) {
    return (
        <div className="w-full flex items-center justify-end mb-6">
            <label className="mr-2">Categories:</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
                {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-bg">
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
}
