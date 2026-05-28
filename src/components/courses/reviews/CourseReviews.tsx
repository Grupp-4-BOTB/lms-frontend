"use client";

import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

type CourseReviewProps = {
  courseId: number;
  studentId: number;
};

export type Review = {
  id: number;
  courseId: number;
  studentId: number;
  comment: string;
  createdAt: string;
};

export default function CourseReviews({courseId, studentId,}: CourseReviewProps) 
{
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
        const response = await fetch(`https://localhost:7188/api/courses/${courseId}/reviews`);

        if (!response.ok) {
        console.error("Failed to fetch reviews.");
        setIsLoading(false);
        return;
        }

        const data: Review[] = await response.json();
        setReviews(data);
        setIsLoading(false);
    };

  useEffect(() => {fetchReviews();}, [courseId]);

  return (
    <section>
      <ReviewForm
        courseId={courseId}
        studentId={studentId}
        onReviewSubmitted={fetchReviews}
      />
      {isLoading ? (<p>Loading reviews...</p>) : (<ReviewList reviews={reviews} />)}
    </section>
  );
}