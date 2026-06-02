"use client";

import { useEffect, useState } from "react";
import CourseRating from "@/components/courses/ratings/CourseRatings";
import CourseReviews from "@/components/courses/reviews/CourseReviews";
import { stringify } from "querystring";

type Props = {
  course: {
    id: number;
  };
};

export default function CourseDetailsReviews({ course }: Props) {

  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("nameid");

    if (storedUserId) {
      setStudentId((storedUserId));
    }
  }, []);

  if (!studentId) {
    <CourseRating courseId={course.id} />
    return <p>Please login to write a review.</p>;
  }
  
  return (
    <div className="flex flex-col gap-6">

      <CourseRating courseId={course.id} />
      <CourseReviews
        courseId={course.id}
        studentId={studentId}
      />
    </div>
  );
}