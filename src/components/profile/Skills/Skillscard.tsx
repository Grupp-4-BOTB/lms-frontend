export default function SkillsCard({label, onDelete}: {label: string; onDelete?: () => void}) {
    return (
        <div className="flex items-center gap-1 border-2 bg-[var(--background-color)] border-[#EEE] text-[#AAA] text-sm rounded-full px-2 py-1">
            <span>{label}</span>
            {onDelete && (
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                    ×
                </button>
            )}
        </div>
    );
}