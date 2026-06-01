"use client";

import PopularCourseCard from "@/components/courses/PopularCourseCard";
import AllCourseCard from "@/components/courses/AllCourseCard";
import { useEffect, useState } from "react";

async function getCourses() {
  const response = await fetch("https://webapi-shiko-lms.azurewebsites.net/api/Courses");
  return response.json();
}

async function getPopularCourses() {
  const response = await fetch("https://webapi-shiko-lms.azurewebsites.net/api/Courses/popular");
  return response.json();
}

// Hämtar rating för en kurs, courseId skickas in genom mapningen
async function getRating(courseId: string) {
  const response = await fetch(`https://webapp-ratings-richard-hvatdegdcyfkejda.swedencentral-01.azurewebsites.net/api/courses/${courseId}/ratings`
  );

  return response.json();
}

//sidan
export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      //hämtar courses som omvandlas till json format tex: id: 1, title: react, rating: 0.
      const courses = await getCourses();

      //mapar ut varje course, tar ut course.id och använder för fetchen getRating. Det är här course. delen i kortet hämtar sina värden, exempelvis course.rating
      const coursesWithRatings = await Promise.all(
        courses.map(async (course: any) => {
          try {
            const ratingData = await getRating(course.id);

            return {
              ...course,
              rating: ratingData.averageRating ?? 0,
              totalReviews: ratingData.totalReviews ?? 0,
            };
          } catch (error) {
            console.error("Kunde inte hämta rating för course:", course.id, error);

            return {
              ...course,
              rating: 0,
              totalReviews: 0,
            };
          }
        })
      );

      setAllCourses(coursesWithRatings);

      const popular = await getPopularCourses();
      setPopularCourses(popular);
    };

    fetchCourses();
  }, []);

  return (
    <section className="px-2 pb-3 rounded-2xl space-y-7 mx-auto">
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

      <div className="space-y-1">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-semibold text-2xl">All Courses</h2>

          <p
            onClick={() => setShowAllCourses(!showAllCourses)}
            className="text-sm text-orange-600 cursor-pointer"
          >
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
              totalReviews={course.totalReviews}
            />
          ))}
        </div>
      </div>
    </section>
  );
}