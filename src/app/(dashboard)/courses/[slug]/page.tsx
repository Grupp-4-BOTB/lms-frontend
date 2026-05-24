import CourseDetailsOverview from "@/components/courses/details/CourseDetailsOverview";
type Props = {
  params: {
    slug: string;
  };
};

async function getCourseDetails(slug: string) {
  const res = await fetch(`https://webapi-shiko-lms.azurewebsites.net/api/Courses/${slug}`);

  return res.json();
}

export default async function CourseDetailsPage({ params }: Props) {

  const { slug } = await params;

  const course = await getCourseDetails(slug);

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
      <CourseDetailsOverview course={course} />

    </div>
  );
}
