export default function SkillsCard({label}: {label: string}) {
    return (
        <div className="flex flex-wrap gap-2 border-2 bg-[var(--background-color)] border-[#EEE] text-[#AAA] text-sm rounded-full px-4 py-1 inline-block">
            <span>{label}</span>
        </div>
    );
}