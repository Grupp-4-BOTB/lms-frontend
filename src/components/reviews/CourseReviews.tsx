import {useEffect, useState} from "react";
import AvarageRatingCard from "./AvarageRatingCard";
import DetailedRating from "./DetailedRating";
import ReviewForm from "./ReviewForm";

type CourseReviewProps = {
    courseId: number;
    studentId: number;
};

type RatingSummary = {
    avarageRating: number;
    totalReviews: number;
    ratings:{
        stars:number;
        percentage:number;
    }[];
}

//create component

export default function CourseReviews({courseId, studentId,}:CourseReviewProps){

    const [summary, setSummary] = useState<RatingSummary | null > (null);

    // fetch review summary based on courseId from backend API
    const fetchSummary = async () => {

        const response = await fetch(`https://localhost:7000/api/courses/${courseId}/reviews/summary`);

        if (!response.ok) {
            console.error("Failed to fetch reviews.");
            return;
        }
        
        // take the data from api fetch and put it into the useState to update summary.
        const data = await response.json();
        setSummary(data);

    };

    useEffect(() => { fetchSummary(); }, [courseId]);

    if(!summary){
        return <p> Loading reviews...</p>
    }

    return (
        <section className="">

            <div className="">
                <AvarageRatingCard avarageRating={summary.avarageRating} totalReviews={summary.totalReviews}/>
                
                <DetailedRating rating={summary.ratings}/>

            </div>
            <ReviewForm courseId={courseId} studentId={studentId} onReviewSubmitted={fetchSummary}/>


        </section>
    )

};

