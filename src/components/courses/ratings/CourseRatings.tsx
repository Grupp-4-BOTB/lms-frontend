"use client";

import { useEffect, useState } from "react";
import AvarageRatingCard from "./AvarageRatingCard";
import DetailedRating from "./DetailedRating";

type CourseRatingProps = {
  courseId: number;
};

type RatingSummary = {
  averageRating: number;
  totalReviews: number;
  ratings: {
    stars: number;
    percentage: number;
  }[];
};

export default function CourseRating({courseId,}: CourseRatingProps) {
  const [summary, setSummary] = useState<RatingSummary | null>(null);

  const fetchRatingSummary = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RATINGS_API_URL}/api/courses/${courseId}/ratings/summary`
    );

    if (!response.ok) {
      console.error("Failed to fetch rating summary");
      return;
    }

    const data: RatingSummary = await response.json();

    setSummary(data);
  };

  useEffect(() => {fetchRatingSummary();}, [courseId]);

  if (!summary) {
    return <p>Loading rating...</p>;
  }

  return (
    <section>
      <AvarageRatingCard
        averageRating={summary.averageRating}
        totalReviews={summary.totalReviews}
      />

      <DetailedRating ratings={summary.ratings} />
    </section>
  );
}