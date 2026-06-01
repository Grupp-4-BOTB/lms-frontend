"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';

//import CourseDetailsRouting from "@/components/ui/CourseDetailsRouting";

export default function CourseDetailsRouting({ slug }: { slug: string }) {
  const pathname = usePathname();

  const linkClass = (href: string) => `flex items-center text-[#AAA] gap-2 px-3 py-2 transition-all hover:bg-[var(--primary-color)] rounded-[9px] hover:text-white group 
    ${pathname === href 
    ? 'bg-[var(--primary-color)] text-white' 
    : 'text-[#AAA] hover:bg-[var(--primary-color)] hover:text-white'}`;

  return (
    
    <div className="flex gap-4 text-sm">
        <Link
            href={`/courses/${slug}`}
            className={linkClass(`/courses/${slug}`)}>
            Overview
        </Link>
              {/* /beroende på vilken slugen är exempelvis kurs i C# så routar den till /courses/c#/reviews */}
        <Link
            href={`/courses/${slug}/reviews`}
            className={linkClass(`/courses/${slug}/Reviews`)}>
              Reviews
        </Link>

        <Link
            href={`/courses/${slug}/instructor`}
            className={linkClass(`/courses/${slug}/instructor`)}>
            Instructor
        </Link>
    </div>
  )
}