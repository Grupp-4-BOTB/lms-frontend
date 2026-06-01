import CourseDetailsOverview from "@/components/courses/details/CourseDetailsOverview";
import CourseDetailsHero from "@/components/courses/details/CourseDetailsHero";

type Props = {
  params: {
    slug: string;
  };
};

export async function getCourseDetails(slug: string) {
  const courseResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Courses/${slug}`);

  return courseResponse.json();
}

export default async function CourseDetailsPage({ params }: Props) {

  const { slug } = await params;

  const course = await getCourseDetails(slug);

  console.log("SLUG:", slug);
  console.log("COURSE:::", course);

  const keyPoints = course.courseOverview?.keyPoints
    ? course.courseOverview.keyPoints
        .split(";")
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0)
    : [];

  course.courseOverview = { 
    ...course.courseOverview, 
    keyPoints: keyPoints 
  };
  
  return (
    <div className="w-full">
      <CourseDetailsHero course={course}>
        <CourseDetailsOverview course={course} />
      </CourseDetailsHero>
    </div>
  );
}
