type AvarageRatingCardProps = {
    avarageRating: number;
    totalReviews: number;
}


export default function AvarageRatingCards(props : AvarageRatingCardProps){
    const avarageRating = props.avarageRating;
    const totalReviews = props.totalReviews;

    const roundedRating = avarageRating.toFixed(1);

    return (
        <div>
            <h2>Avarage Rating</h2>
            <div>
                <div>
                    {roundedRating}
                    <span>/5</span>
                </div>
                <p>
                    Based on {totalReviews} Reviews
                </p>
            </div>

            //lists out stars and colors them in according to avarageRatings number
            <div className="star-ratings">
                {[1,2,3,4,5].map((star)=> 
                    <span key={star} className={star <= Math.round(avarageRating) ? "orangetext" : "graytext"}>
                        * //starimage insert here
                    </span>
                )}
            </div>
        </div>


    )



};