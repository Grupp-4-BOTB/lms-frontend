"use client";

import { useEffect, useState } from "react";
import SkillsCard from "./Skillscard";

interface SkillCatalog {
    id: string;
    name: string;
}

interface UserSkill {
    id: string;
    skillCatalogId: string;
    skillCatalog: SkillCatalog;
}

interface SkillsProps {
    ownerId: string;
    isOwner: boolean;
}
export default function Skills({ ownerId, isOwner }: SkillsProps) {
    const [catalog, setCatalog] = useState<SkillCatalog[]>([]);
    const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
    const [showCatalog, setShowCatalog] = useState(false);
    const [customSkill, setCustomSkill] = useState("");
    const SKILL_SERVICE_URL = "https://webapp-skillservice-emil-e4h0bubfendxfxgn.germanywestcentral-01.azurewebsites.net";
    const API_KEY = "Test123!";

    useEffect(() =>{
        async function fetchData() {
            const [catalogRes, userSkillsRes] = await Promise.all([
                fetch(`${SKILL_SERVICE_URL}/api/skills/catalog`, {
                    headers: {
                        "X-API-Key": API_KEY
                    }
                }),
                fetch(`${SKILL_SERVICE_URL}/api/skills/${ownerId}`, {
                    headers: {
                        "X-API-Key": API_KEY
                    }
                })
            ]);
            setCatalog(await catalogRes.json());
            setUserSkills(await userSkillsRes.json());
        }
        fetchData();
    }, [ownerId]);

    async function handleAddSkill(skillCatalogId: string) {
        const response = await fetch(`${SKILL_SERVICE_URL}/api/skills`, {
            method: "POST",
            headers: {
                "X-API-Key": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ skillCatalogId, ownerId })
        });
        if (response.ok) {
            const userSkillsRes = await fetch(`${SKILL_SERVICE_URL}/api/skills/${ownerId}`, {
                headers: {
                    "X-API-Key": API_KEY
                }
            });
            setUserSkills(await userSkillsRes.json());
        }
    }

    async function handleDeleteSkill(id: string) {
        await fetch(`${SKILL_SERVICE_URL}/api/skills/${id}`, {
            method: "DELETE",
            headers: {
                "X-API-Key": API_KEY
            }
        });
        setUserSkills(prev => prev.filter(s => s.id !== id));
    }

    async function handleAddCustomSkill() {
        if (!customSkill.trim()) return;

        const response = await fetch(`${SKILL_SERVICE_URL}/api/skills/customSkill`, {
            method: "POST",
            headers: {
                "X-API-Key": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ownerId, skillName: customSkill.trim() })
        });
        if (response.ok) {
            const userSkillsRes = await fetch(`${SKILL_SERVICE_URL}/api/skills/${ownerId}`, {
                headers: {
                    "X-API-Key": API_KEY
                }
            });
            setUserSkills(await userSkillsRes.json());
        }
    }

    return (
        <div className="flex flex-col gap-2">
            
            <p className="text-primary text-lg font-bold px-3">Skills</p>
                
            <div className="flex flex-wrap gap-3 justify-start pl-3">
                {userSkills
                    .filter(skill => skill.skillCatalog !== null)
                    .map(skill => (
                    <SkillsCard
                    key={skill.id}
                    label={skill.skillCatalog.name}
                    onDelete={isOwner ? () => handleDeleteSkill(skill.id) : undefined} 
                    />
                ))}

                {isOwner && (
                    <button
                    className="border-2 bg-[var(--background-color)] border-[#EEE] text-[#AAA] text-sm rounded-full px-4 py-1 hover:border-orange-500 hover:text-orange-500"
                    onClick={() => setShowCatalog(!showCatalog)}> + </button>
                )}

            </div>

            {showCatalog && isOwner && (
                <div className="flex flex-wrap gap-2 mt-2 p-3 bg-white border border-gray-200 rounded-xl">
                    {catalog
                    .filter(c => !userSkills.some(s => s.skillCatalogId === c.id))
                    .map(skill => (
                        <button
                        key={skill.id}
                        onClick={() => handleAddSkill(skill.id)}
                        className="border-2 bg-[var(--background-color)] border-[#EEE] text-[#AAA] text-sm rounded-full px-4 py-1 hover:border-orange-500 hover:text-orange-500">
                            {skill.name}
                        </button>
                    ))}

                    <div>
                        <input
                            type="text" 
                            placeholder="Add your own skill..."
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddCustomSkill()}
                            className="flex-1 border border-gray-300 rounded-full px-4 py-1 text-sm outline-none focus:border-orange-500"
                        />
                        <button
                            onClick={handleAddCustomSkill}
                            className="ml-2 border-2 bg-[var(--background-color)] border-[#EEE] text-[#AAA] text-sm rounded-full px-4 py-1 hover:border-orange-500 hover:text-orange-500">
                            Add Skill
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}