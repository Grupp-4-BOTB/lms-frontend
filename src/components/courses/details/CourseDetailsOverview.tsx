import Image from "next/image";
import CourseDetailsRouting from "@/components/ui/CourseDerailsRouting";

type Props = {
  course: {
    id: number;
    slug: string;
    title: string;
    courseImage: string;
    instructorImg: string;
    instructorName: string;
    rating: number;
    lessonsCount: number;
    duration: string;

    courseOverview: {
      detailImage: string;
      description: string;
      keyPoints: any;
    };
  };
};

// --        w-[780px]→ w-195,  h-[470px]→ h-117.5        --

export default function CourseDetailsOverview({ course }: Props) {
  return (
    <div className="px-2 gap-4 flex flex-col">
   
      <div className="flex text-lg font-semibold"><p className="text-gray-400 px-2">Courses</p>
        <Image src="/images/courses/arrows-button.svg" alt="" className="text-gray-400 h-2 w-2 mt-2.5" width={20} height={20} />
        <Image src="/images/courses/arrows-button.svg" alt="" className="text-gray-400 h-2 w-2 mt-2.5" width={20} height={20} />
        <p className="text-gray-800 px-3">{course.title}</p>
      </div>

      <div className="w-205 flex justify-center items-center rounded-2xl bg-[#dfe6ec] gap-4 p-6">
        
        <div className="flex flex-col gap-5">

          <Image src={course.courseOverview.detailImage} alt="" className="w-191 h-113 object-cover" width={800} height={400} />
          
          <h2 className="text-3xl font-semibold text-gray-800">{course.title}</h2>

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
                  <img src="/images/courses/all-courses-star.svg" alt="" className="inline h-4 w-4 ml-3" />{course.rating}
                </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <CourseDetailsRouting slug={course.slug} />
          </div>

          <span className="text-gray-600"><p className="font-semibold text-2xl text-gray-800">About</p>{course.courseOverview.description}</span>
          
          <p className="font-semibold text-2xl text-gray-800">Key Point</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        
            {course.courseOverview.keyPoints?.map((point: string, index: number) => (

              <div key={index} className="flex items-start gap-3">
                <Image src="/images/courses/course-overview-vector.svg" alt="" className="h-3 w-3 mt-1" width={20} height={20} />
                <p className="text-gray-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}