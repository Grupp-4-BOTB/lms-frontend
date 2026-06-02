"use client";

import { useState } from "react";
import Button from "../../ui/Button";

//vad ReviewForm functionen ska få in
type ReviewFormProps = {
  courseId: number;
  studentId: string;
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
    const reviewResponse = await fetch( `https://webapp-reviews-richard-dte8c3ddb6bcc4fm.swedencentral-01.azurewebsites.net/api/courses/${courseId}/reviews`,
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
      const errorText = await reviewResponse.text();

      console.log(errorText);

      alert(errorText);

      return;
    }
    
    const ratingResponse = await fetch(`https://webapp-ratings-richard-hvatdegdcyfkejda.swedencentral-01.azurewebsites.net/api/courses/${courseId}/ratings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          rating: rating,
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

        {/*sätter numret för ratingen renderas om och färgar korrekt, om star är mindre än eller samma som rating bli orange*/}
      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
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

      <Button onClick={handleSubmit} className="mt-4 flex items-center gap-3" variant="orange" size="sm" buttonStyle="default">
          Submit
      </Button>
    </div>
  );
}