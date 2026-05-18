type Rating = {
    stars: number;
    percentage: number;
}
type DetailRatingProps = {
    rating: Rating[];
};


export default function DetailedRating(props : DetailRatingProps) {

    const rating = props.rating;

    return(

        <div>
            <h2>Detailed Rating</h2>
            <div>
                {rating.map((item) =>
                <div key={item.stars} className="">
                    <span className="">
                        {item.percentage}%
                    </span>

                    <div className="flex gap-0.5 text-sm">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <span key={star} style={{color: star <= item.stars? "var(--accent-color)" : "var(--body-text-color)",}}>
                            ★
                            </span>

                        ))}

                    </div>  

                    <div className="progressbar" style={{ width: `${item.percentage}%`, backgroundColor: "var(--accent-color)" }}> 
                    </div>

                </div>
            
            )}
            </div>

        </div>



    );
};