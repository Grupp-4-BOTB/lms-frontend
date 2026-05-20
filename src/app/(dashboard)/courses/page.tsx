"use client"
import PopularCourseCard from "@/components/courses/PopularCourseCard";
import AllCourseCard from "@/components/courses/AllCourseCard";
import { useEffect,useState } from "react";

async function getCourses() {
  const res = await fetch("https://localhost:7093/api/Courses");

  return res.json();
}


// ------- MOCK data  Popular Courses -----------
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
  const [allCourses, setAllCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      setAllCourses(courses);
    };

    fetchCourses();
  }, []);

  const [showAllCourses, setShowAllCourses] = useState(false);
  return (
    <section className="px-3 pb-5 rounded-2xl space-y-8 mx-auto">
            {/* ----------- Popular Courses Section ---------- */}

            <div className="px-5 py-5 bg-white rounded-2xl space-y-4">
                <h2 className="font-semibold text-3xl">Popular This Week</h2>

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
            <div className="space-y-2">
              <div className="flex items-center justify-between px-4">
                <h2 className="font-semibold text-3xl">All Courses</h2>
                <p onClick={() => setShowAllCourses(!showAllCourses)} className="text-base text-orange-600 cursor-pointer">
                  {showAllCourses ? "Show Less" : "See All"}
                </p>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">

                    {(showAllCourses ? allCourses : allCourses.slice(0, 6)).map((course) => (
                        <AllCourseCard
                            key={course.id}
                            slug={course.slug}
                            courseImage={course.courseImage}
                            title={course.title}
                            instructorImg={course.instructorImage}
                            instructorName={course.instructorName}
                            rating={course.rating}
                            lessonsCount={course.lessonsCount}
                            duration={course.duration}
                            href={`/courses/${course.slug}`}
                        />
                    ))}
                </div>
            </div>
    </section>
  );
}