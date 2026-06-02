type CourseRatingBadgeProps = {
  averageRating: number;
  totalReviews?: number;
};

export default function CourseRatingBadge({
  averageRating,
  totalReviews,
}: CourseRatingBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span className="text-orange-500">★</span>

      <span>
        {averageRating.toFixed(1)}

        {totalReviews !== undefined && (<> ({totalReviews} reviews)</> )}
      </span>
    </div>
  );
}