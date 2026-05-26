"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';

//import CourseDetailsRouting from "@/components/ui/CourseDerailsRouting";

export default function CourseDetailsRouting({ slug }: { slug: string }) {
  const pathname = usePathname();

  const linkClass = (href: string) => `flex items-center text-[#AAA] gap-3 p-2 transition-all hover:bg-[var(--primary-color)] rounded-[9px] hover:text-white group 
    ${pathname === href 
    ? 'bg-[var(--primary-color)] text-white' 
    : 'text-[#AAA] hover:bg-[var(--primary-color)] hover:text-white'}`;

  return (

    <div className="flex gap-6">
        <Link
            href={`/courses/${slug}`}
            className={linkClass(`/courses/${slug}`)}>
            Overview
        </Link>

        <Link
            href={`/courses/${slug}/instructor`}
            className={linkClass(`/courses/${slug}/instructor`)}>
            Instructor
        </Link>
    </div>
  )
}