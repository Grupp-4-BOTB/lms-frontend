type RatingRow = {
    stars: number;
    percentage: number;
}
type DetailedRatingProps = {
    ratings: RatingRow[];
};


export default function DetailedRating({ ratings }: DetailedRatingProps) {


   return (
    <div>
      <h2>Detailed Rating</h2>

      <div className="space-y-3">
        {ratings.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="w-10 text-sm">{item.percentage}%</span>

            <div className="flex gap-0.5 text-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    color:
                      star <= item.stars? "var(--accent-color)":"var(--body-text-color)",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <div
              className="h-2 w-40 rounded-full"
              style={{ backgroundColor: "var(--mid-dark-gray-color)" }}
            >
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: "var(--accent-color)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};