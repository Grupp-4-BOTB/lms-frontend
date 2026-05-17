import React from 'react'

interface Props {
  name: string;
  role: string;
  isChecked: boolean;
  onCheckChange: () => void;
  onDelete: () => void;
}

export default function Members({ name, role, isChecked, onCheckChange, onDelete }: Props) {
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