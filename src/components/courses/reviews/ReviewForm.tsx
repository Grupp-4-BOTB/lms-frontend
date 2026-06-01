"use client";

import { useState } from "react";

//vad ReviewForm functionen ska få in
type ReviewFormProps = {
  courseId: number;
  studentId: number;
  onReviewSubmitted: () => Promise<void>;
};

export default function ReviewForm({courseId,studentId, onReviewSubmitted,}: ReviewFormProps) 
{
  //comment satt som tom
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  //körs efter submit
  const handleSubmit = async () => {
      if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    if (comment.trim() === "") {
      alert("Please write a review.");
      return;
    }
    //kör en http request till backend, POST, json data, innehållet är studentId och kommentaren
    const reviewResponse = await fetch( `${process.env.NEXT_PUBLI5C_API_URL}/api/courses/${courseId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          comment: comment,
        }),
      }
    );

    if (!reviewResponse.ok) {
      alert("Something went wrong when saving review");
      return;
    }
    
    const ratingResponse = await fetch(`${process.env.NEXT_PUBLIC_RATINGS_API_URL}/api/courses/${courseId}/ratings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          stars: rating,
        }),
      }
    );
      if (!ratingResponse.ok) {
        alert("Review was saved, but rating failed.");
        return;
      }


      setComment("");
      setRating(0);

    //awaitar fetchReviews
    await onReviewSubmitted();
  };

  return (
    <div>
      <h2>Write a Review</h2>

      <p className="mt-2 text-sm text-gray-400">Select your rating</p>

      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            //sätter numret för ratingen renderas om och färgar korrekt, om star är mindre än eller samma som rating bli orange
            onClick={() => setRating(star)}
            className={`text-2xl transition ${star <= rating ? "text-orange-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Enter feedback here..."
        className="mt-4 h-32 w-full resize-none rounded-xl bg-gray-100 p-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-orange-400"
      />

      <button type="button" onClick={handleSubmit} className="mt-4">
        Submit Review
      </button>
    </div>
  );
}