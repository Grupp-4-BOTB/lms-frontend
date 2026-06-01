"use client";

import CourseRating from "@/components/courses/ratings/CourseRatings";
import CourseReviews from "@/components/courses/reviews/CourseReviews";

type Props = {
  course: {
    studentId: number;
  };
};

export default function CourseDetailsReviews({ course }: Props) {
  const studentId = course.studentId

  return (
    <div className="flex flex-col gap-6">
      <CourseRating courseId={course.studentId} />

      <CourseReviews
        courseId={course.studentId}
        studentId={studentId}
      />
    </div>
  );
}