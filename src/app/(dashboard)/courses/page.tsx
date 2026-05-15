import PopularCourseCard from "@/components/courses/PopularCourseCard";
import AllCourseCard from "@/components/courses/AllCourseCard";


// ------- MOCK data -----------
const popularCourses = [
  {
    id: 1,
    title: "Graphic Design",
    description: "Creating Visual Content",
    icon: "/images/courses/course-icon1.svg",
    href: "/courses"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Combines User Interface (UI)",
    icon: "/images/courses/course-icon2.svg",
    href: "/courses"
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "The Collection of Visual",
    icon: "/images/courses/course-icon3.svg",
    href: "/courses"
  },
  {
    id: 4,
    title: "Web Design",
    description: "Process of Creating Websites",
    icon: "/images/courses/course-icon4.svg",
    href: "/courses"
  }
];


export default function CoursesPage() {
  return (

    <section className="pt-28 px-6 pb-6 space-y-10 mx-auto">
            {/* ----------- Popular Courses Section ---------- */}

            <div className="px-5 py-6 bg-pink-100 rounded-2xl space-y-4">
                <h2 className="font-bold text-2xl">Popular This Week</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {popularCourses.map((course) => (
                        <PopularCourseCard
                            key={course.id}
                            title={course.title}
                            description={course.description}
                            icon={course.icon}
                            href={course.href}
                        />
                    ))}
                </div>

            </div>

            {/* ----------- All Courses Section ---------- */} 
            <div className="px-5 py-6 bg-pink-100 rounded-2xl space-y-4">
                <h2 className="font-bold text-2xl">All Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {popularCourses.map((course) => (
                        <AllCourseCard
                            key={course.id}
                            title={course.title}
                            

                            
                        />
                    ))}
                </div>
            </div>
    </section>
  );
}