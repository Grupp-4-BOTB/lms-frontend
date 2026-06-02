import Button from "../ui/Button";
import Link from "next/link";
import CourseRatingBadge from "./ratings/CourseRatingStar";

type Props = {
  courseImage: string;
  slug: string;
  title: string;
  instructorImg: string;
  instructorName: string;
  rating: number;
  lessonsCount: number;
  duration: string;
  href: string;
  totalReviews: number;
};

export default function AllCourseCard({ courseImage, slug, title, instructorImg, instructorName, rating, totalReviews, lessonsCount, duration, href }: Props) {
  return (

    <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 w-[500px] h-[320px] border border-gray-200">
      <img src={courseImage} alt="" className="w-118 h-41 rounded-xl object-cover" />
      <h3 className="font-semibold text-xl">{title}</h3>
    
      <div className="flex items-center">
        <img src={instructorImg} alt="" className="w-5 h-5 rounded-full" />
        <p className="text-sm text-gray-400 ml-2">{instructorName}</p>
        <CourseRatingBadge averageRating={rating} totalReviews={totalReviews}/>
      </div>

      <div className="flex items-center justify-start gap-34 px-1 text-xs text-gray-400 py-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <img src="/images/courses/lesson-icon.svg" alt="" />
            <span> {lessonsCount} Lessons</span>
          </div>

          <div className="flex items-center gap-1">
            <img src="/images/courses/clock-icon.svg" alt="" />
            <span>{duration}</span>
          </div>
        </div>
          

        <Link href={`/courses/${slug}`}>
          <Button className="flex items-center gap-3" variant="orange" size="md" buttonStyle="default">
            View Details
            <img src="/images/courses/arrow-right.svg" alt="" className="block h-3 w-3" />
          </Button>
        </Link>

      </div> 
    </div>
  );
}