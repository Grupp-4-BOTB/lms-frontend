"use client"
import PopularCourseCard from "@/components/courses/PopularCourseCard";
import AllCourseCard from "@/components/courses/AllCourseCard";

import { useEffect,useState } from "react";

async function getCourses() {
  const coursesResponse = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/Courses");

  return coursesResponse.json();
}

async function getPopularCourses() {
  const popularResponse = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/Courses/popular");

  return popularResponse.json();
}

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [popularCourses, setPopularCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      setAllCourses(courses);

      const popular = await getPopularCourses();
      setPopularCourses(popular);
    };

    fetchCourses();
  }, []);

  const [showAllCourses, setShowAllCourses] = useState(false);
  return (
    <section className="px-2 pb-3 rounded-2xl space-y-7 mx-auto">
      
      {/* ----------- Popular Courses Section ---------- */}

      <div className="px-5 py-2 bg-white rounded-2xl space-y-1">
          <h2 className="font-semibold text-2xl">Popular This Week</h2>

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
      <div className="space-y-1">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-semibold text-2xl">All Courses</h2>
          <p onClick={() => setShowAllCourses(!showAllCourses)} className="text-sm text-orange-600 cursor-pointer">
            {showAllCourses ? "Show Less" : "See All"}
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">

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