type AverageRatingCardProps = {
  averageRating: number;
  totalReviews: number;
};

export default function AverageRatingCard({averageRating,totalReviews,}: AverageRatingCardProps) 
{
  const roundedRating = averageRating.toFixed(1);

  return (
    <div>
      <h2>Average Rating</h2>

      <div>
        <div>
          {roundedRating}
          <span>/5</span>
        </div>

        <p>Based on {totalReviews} Reviews</p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{color: star <= Math.round(averageRating)? "var(--accent-color)": "var(--body-text-color)",}}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}