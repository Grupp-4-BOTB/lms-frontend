import Button from "../ui/Button";
import Link from "next/link";

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
};

export default function AllCourseCard({ courseImage, slug, title, instructorImg, instructorName, rating, lessonsCount, duration, href }: Props) {
  return (

    <div className="flex flex-col gap-3 rounded-2xl bg-green-300 p-4">
      <img src={courseImage} alt="" className="w-full rounded-xl object-cover" />
      <h3 className="font-semibold text-2xl">{title}</h3>
    
      <div className="flex items-center">
        <img src={instructorImg} alt="" className="w-6 h-6 rounded-full" />
        <p className="text-sm text-gray-400 ml-2">{instructorName}</p>
        <span className="text-gray-400 px-7">{rating}
        <img src="/images/courses/all-courses-star.svg" alt="" className=" inline h-4 w-3 ml-3" /></span>
      </div>

      <div className="flex items-center justify-between px-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <img src="/images/courses/lesson-icon.svg" alt="" />
          <span> {lessonsCount} Lessons</span>
        </div>
        
        <div className="flex items-center gap-2">
          <img src="/images/courses/clock-icon.svg" alt="" />
          <span>{duration}</span>
        </div>

        <Link href={`/courses/${slug}`}>
          <Button className="flex items-center gap-3" variant="orange" size="md" buttonStyle="default">
            View Details
            <img src="/images/courses/arrow-right.svg" alt="" className="block h-4 w-4" />
          </Button>
        </Link>

      </div> 
    </div>
  );
}