import { useState } from "react";
import { start } from "repl";

type ReviewFormProps = {
  courseId: number;
  studentId: number;
  onReviewSubmitted: () => Promise<void>;
};

export default function ReviewForm({
  courseId,
  studentId,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      //temporary alert
      alert("Please select a rating");
      return;
    }

    const response = await fetch(
      `https://localhost:7000/api/courses/${courseId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          rating: rating,
          comment: comment,
        }),
      }
    );

    if (!response.ok) {
      //temporary alert
      alert("Something went wrong");
      return;
    }

    setRating(0);
    setComment("");

    await onReviewSubmitted();
  };

  return <div>
    <h2>Write a Review</h2>
    <p>Select your rating</p>
    <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (

          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl transition ${
              star <= rating ? "text-orange-500" : "text-gray-300"
            }`}
          >
            //temporary star
            *
          </button>

        ))}
      </div>

       <textarea value={comment} onChange={(event) => setComment(event.target.value)}
        placeholder="Enter feedback here..."
        className="mt-4 h-32 w-full resize-none rounded-xl bg-gray-100 p-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-orange-400"
      />

      <button type="button" onClick={handleSubmit} className="">
        Submit Review
      </button>
  </div>;
}