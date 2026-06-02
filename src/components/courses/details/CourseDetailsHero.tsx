import Image from "next/image";
import CourseDetailsRouting from "@/components/ui/CourseDetailsRouting";
import { ReactNode } from "react";

type Props = {
  course: {
    slug: string;
    title: string;
    courseImage: string;
    lessonsCount: number;
    duration: string;
    rating: number;
    totalReviews: number;
  };
  children?: ReactNode;
};

export default function CourseDetailsHero({ course, children }: Props) {
  return (
    <section className="px-2 gap-4 flex flex-col">
        {/*---------------  Course Details Hero section --------------*/}
   
        <div className="flex text-base font-medium"><p className="text-gray-400 px-2">Courses</p>
            <Image src="/images/courses/arrows-button.svg" alt="" className="text-gray-400 h-2 w-2 mt-2.5" width={20} height={20} />
            <Image src="/images/courses/arrows-button.svg" alt="" className="text-gray-400 h-2 w-2 mt-2.5" width={20} height={20} />
            <p className="text-gray-800 px-3 text-base font-medium">{course.title}</p>
        </div>
      
        <div className="max-w-174 min-h-185 object-cover rounded-2xl bg-[#dfe6ec] gap-4 p-6">
            
            <div className="flex flex-col gap-5">
                <Image src={course.courseImage} alt="" className="w-180 h-75 object-cover rounded-2xl" width={400} height={200} />
                <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>

                <div className="flex gap-10 text-sm text-gray-500 px-2">

                    <div className="flex items-center gap-5">
                        <img src="/images/courses/lesson-icon.svg" alt="" />
                        <span> {course.lessonsCount} Lessons</span>
                    </div>
                
                    <div className="flex items-center gap-2">
                        <img src="/images/courses/clock-icon.svg" alt="" />
                        <span>{course.duration}</span>
                    </div>
                
                    <div className="flex items-center">
                        <span className="text-gray-400">
                        <img src="/images/courses/all-courses-star.svg" alt="" className="inline h-4 w-4 ml-3 mr-2" />{course.rating} ({course.totalReviews} Reviews) 
                        </span>
                    </div>
                </div>
                
                {/*----------  Course details routing /ui component ----------*/}
                <div className="flex items-center">
                    <CourseDetailsRouting slug={course.slug} />
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    </section>
  );
}