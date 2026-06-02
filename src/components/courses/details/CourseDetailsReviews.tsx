"use client";

import CourseRating from "@/components/courses/ratings/CourseRatings";
import CourseReviews from "@/components/courses/reviews/CourseReviews";

type Props = {
  course: {
    id: number;
  };
};

export default function CourseDetailsReviews({ course }: Props) {
  const studentId = 2; // temporärt lägg till studentId från gabriels kod

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