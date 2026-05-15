import Button from "../ui/Button";
import Link from "next/link";

type Props = {
  courseImage: string;
  title: string;
  instructorImg: string;
  instructorName: string;
  rating: number;
  lessonsCount: number;
  href: string;
};

export default function AllCourseCard({ courseImage, title, instructorImg, instructorName, rating, lessonsCount, href }: Props) {
  return (

    <div className="flex flex-col gap-3 px-4 py-4 rounded-xl bg-green-300">
      <img src={courseImage} alt="" className="h-47 w-full object-cover" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{instructorName}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{rating}<img src="/images/courses/all-courses-star.svg" alt="" className="inline h-4 w-4 ml-1" /></span>
        <span>{lessonsCount} lessons</span>
      </div>

      <Link href={href}>
        <Button variant="orange" size="sm" buttonStyle="default">
          View Details
          <img src="/images/courses/arrow-right.svg" alt="" className="block h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}