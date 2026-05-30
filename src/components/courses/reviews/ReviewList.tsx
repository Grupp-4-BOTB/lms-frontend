import type { Review } from "./CourseReviews";

//vad som ska in i functionen, en array av reviews
type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="mt-4 text-sm text-gray-400">No reviews yet.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      //loopa igenom arrayen review
      {reviews.map((review) => (
        <div key={review.id} className="rounded-xl bg-gray-100 p-4">
          //renderar ut kommentaren och id på personen, FIXA NAMN.
          <p className="text-sm text-gray-700">{review.comment}</p>

          <p className="mt-2 text-xs text-gray-400">
            Student {review.studentId}
          </p>
        </div>
      ))}
    </div>
  );
}