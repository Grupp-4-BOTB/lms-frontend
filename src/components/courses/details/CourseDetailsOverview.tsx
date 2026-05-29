import Image from "next/image";

type Props = {
  course: {
    id: number;
    slug: string;
    title: string;
    courseImage: string;
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

export default function CourseDetailsOverview({ course }: Props) {
  return (
    <div className="w-full flex flex-col gap-5">
      <span className="text-gray-600 text-xs">
        <p className="font-semibold text-xl text-gray-800">About</p>
        {course.courseOverview.description}
      </span>  

          
      <p className="font-semibold text-xl text-gray-800">Key Point</p>
      <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-1">
    
        {course.courseOverview.keyPoints?.map((point: string, index: number) => (

          <div key={index} className="flex items-start gap-3">
            <Image src="/images/courses/course-overview-vector.svg" alt="" className="h-3 w-3 mt-1" width={20} height={20} />
            <p className="text-gray-600">{point}</p>
          </div>
        ))}
        </div>
    </div>
  );
}