"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

//import ProfileRouting from '@/components/ui/ProfileRouting'
// </ProfileRouting >

export default function ProfileRouting() {
  const pathname = usePathname();

  const linkClass = (href: string) => `flex items-center text-[#AAA] gap-3 p-2 transition-all hover:bg-[var(--primary-color)] rounded-[9px] hover:text-white group 
    ${pathname === href 
    ? 'bg-[var(--primary-color)] text-white' 
    : "hover:bg-[var(--primary-color)] hover:text-white"}`;
  return (


<div className="flex gap-2 pt-5 pl-2">

        <Link
              href="/profile/general"
              className={linkClass("/profile/general")}>
                General
        </Link>

        <Link
              href="/profile/teams"
              className={linkClass("/profile/teams")}>
                Teams
        </Link>

</div>


  )
}
