import SkillsCard from "./Skillscard";

export default function Skills() {
    return (
        <div className="flex flex-col gap-2 px-3">
            
            <p className="text-primary text-lg font-bold">Skills</p>
            <div className="flex flex-wrap gap-2 justify-start">
            <SkillsCard label="Web Design" />
            <SkillsCard label="Python" />
            <SkillsCard label="React" />
            <SkillsCard label="Node.js" />
            <SkillsCard label="Product Management" />
            <SkillsCard label="HTML" />
            </div>

        </div>
    );
}