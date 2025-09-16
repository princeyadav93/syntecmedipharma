type Props = {
    value: string;
    onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
    return (
        <div className="w-full mb-6">
            <input
                type="text"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
    );
}
