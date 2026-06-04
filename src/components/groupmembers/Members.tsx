import React from 'react'
import Image from "next/image";

interface Props {
  name: string;
  role: string;
  profilePic: string; 
  isChecked: boolean;
  onCheckChange: () => void;
  onDelete: () => void;
}

export default function Members({ name, role, profilePic, isChecked, onCheckChange, onDelete }: Props) {
  return (
    <div className="bg-[var(--background-color)] rounded-[13px] p-5 mb-3 last:mb-0">
      <div className="grid grid-cols-2 w-full">
        
        {/* VÄNSTER SIDA (Kryssruta + Namn) */}
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={isChecked} 
            onChange={onCheckChange} 
            className="w-5 h-5 rounded-[4px] border border-gray-300 accent-[#ED5735] cursor-pointer" 
          />

                <Image 
          src={profilePic}
          alt="Profile picture of a member" 
          width={50} 
          height={50} 
          className="rounded-full object-cover" 
        />


          <div>{name}</div>
        </div>

        {/* HÖGER SIDA (Role + Delete) */}
        <div className="flex justify-between">
          <div>{role}</div>


            <button onClick={onDelete} className="cursor-pointer">
                Delete
            </button>


        </div>
      </div>
    </div>
  )
}