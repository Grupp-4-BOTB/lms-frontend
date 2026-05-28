import Image from "next/image";
import CourseDetailsHero from "./CourseDetailsHero";

type Props = {
  slug: string;
  course: {
    instructorName: string; 
    instructorImage: string;
  };
  instructor: {
    id: string;
    instructorTitle: string;
    biography: string;
  };
};


export default async function CourseDetailsInstructor({ slug, course, instructor }: Props) {

  return (
    
    <section  className="flex gap-5 flex-col">

      <div className="flex items-center gap-5">
        <img src={course.instructorImage} alt={course.instructorName} className="w-20 h-20 object-cover rounded-full" />

        <div className="text-gray-800 text-base">
          <h3 className="font-semibold text-xl">{course.instructorName}</h3>
          <p className="py-1">{instructor.instructorTitle}</p>
        </div>
      </div>
      

      <div className="flex flex-row items-center gap-2 text-gray-500">


        <span className="text-sm ">mail</span>
        <span className="text-sm">telefon</span>
        <span className=" text-sm">chat</span>


      </div>

    
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg text-gray-800">About Instructor</p>
        <p className="text-gray-500 text-sm">{instructor.biography}</p>
      </div>
    </section>
  );
}