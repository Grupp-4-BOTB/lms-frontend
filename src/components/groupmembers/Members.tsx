import React from 'react'

export default function Members() {
  return (
    
    
<div className="bg-[var(--background-color)] rounded-[13px] p-5">
<div className="grid grid-cols-2 w-full">


  <div className="flex items-center gap-3">
      <input 
      type="checkbox" 
      className="w-5 h-5 rounded-[4px] border border-gray-300 accent-[#ED5735] cursor-pointer" />
      <div>Firstname Lastname</div>
  </div>


  <div className="flex justify-between">
          <div>Student</div>
          <button className="cursor-pointer">Delete</button>
        </div>
    </div>
</div>






  )
}
