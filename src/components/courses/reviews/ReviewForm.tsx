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

  //körs efter submit
  const handleSubmit = async () => {
    if (comment.trim() === "") {
      alert("Please write a review.");
      return;
    }
    //kör en http request till backend, POST, json data, innehållet är studentId och kommentaren
    const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/reviews`,
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

    if (!response.ok) {
      alert("Something went wrong");
      return;
    }

    setComment("");

    //awaitar egentligen fetchReviews
    await onReviewSubmitted();
  };

  return (
    <div>
      <h2>Write a Review</h2>

      <textarea
        value={comment}
        //onChange så visar textarea vad som finns i setComment staten
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