"use client";

import { useEffect, useState } from "react";
import CourseRating from "@/components/courses/ratings/CourseRatings";
import CourseReviews from "@/components/courses/reviews/CourseReviews";

type Props = {
  course: {
    id: number;
  };
};

export default function CourseDetailsReviews({ course }: Props) {

  const [studentId, setStudentId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    
    if (storedUserId) {
      setStudentId(Number(storedUserId));
    }
  }, []);

  if (!studentId) {
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