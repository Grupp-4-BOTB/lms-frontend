"use client";

//uppdaterar ui:t dynamiskt 
import { useEffect, useState } from "react";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

//vad courseReviews behöver få in från courseDetails sidan
type CourseReviewProps = {
  courseId: number;
  studentId: number;
};

//hur en review kommer se ut när den kommer från backend
export type Review = {
  id: number;
  courseId: number;
  studentId: number;
  comment: string;
  createdAt: string;
};





export default function CourseReviews({courseId, studentId,}: CourseReviewProps) 
{
  //när course reviews sidan laddas in startar listan med reviews som tom och isLoading true tills data har hämtats
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //hämtar all data (reviews) via GET-request med hjälp av kursens id
  const fetchReviews = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/reviews`);

        if (!response.ok) {
        console.error("Failed to fetch reviews.");
        setIsLoading(false);
        return;
        }

        //om allt går okej så skapas en lista med datan och blir satt i useStaten setReviews. Listan är Review och har 
        const data: Review[] = await response.json();
        setReviews(data);
        setIsLoading(false);
    };

    //när sidan laddas ska metoden fetchReviews som är ovan köras igen
  useEffect(() => {fetchReviews();}, [courseId]);



  //componenten renderar ut reviewForm 
  return (
    <section>
      <ReviewForm
        courseId={courseId}
        studentId={studentId}
        onReviewSubmitted={fetchReviews}
      />
      //importar reviewList och skickar in reviews
      {isLoading ? (<p>Loading reviews...</p>) : (<ReviewList reviews={reviews} />)}
    </section>
  );
}