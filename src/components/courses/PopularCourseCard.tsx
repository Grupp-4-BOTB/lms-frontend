import Link from "next/link";

type Props = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export default function PopularCourseCard({ title, description, icon, href }: Props) {
  return (

    <section className="flex items-center justify-between px-5 rounded-xl bg-gray-300 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <img src={icon} alt="" className="h-5 w-5 bg-white max-w-md mx-auto" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
        <Link href={href} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 hover:bg-gray-500 transition-colors">
        <img src="/images/courses/arrow-right.svg" alt="Go to course" className="block h-4 w-4" />
        </Link>
    </section>
  );
}