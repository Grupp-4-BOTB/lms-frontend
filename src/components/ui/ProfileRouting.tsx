import React from 'react'
import Link from 'next/link'

//import ProfileRouting from '@/components/ui/ProfileRouting'
// </ProfileRouting >

export default function ProfileRouting() {
  return (


<div className="flex gap-2 pt-5 pl-2">

        <Link
              href="/dashboard"
              className="flex items-center text-[#AAA] gap-3 p-2 transition-all hover:bg-[var(--primary-color)] rounded-[9px] hover:text-white group">
                General
        </Link>

        <Link
              href="/dashboard"
              className="flex items-center text-[#AAA] gap-3 p-2 transition-all hover:bg-[var(--primary-color)] rounded-[9px] hover:text-white group">
                Teams
        </Link>

</div>


  )
}
