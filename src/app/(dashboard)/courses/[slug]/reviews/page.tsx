import CourseDetailsHero from "@/components/courses/details/CourseDetailsHero";
import CourseDetailsReviews from "@/components/courses/details/CourseDetailsReviews";

type Props = {
  params: {
    slug: string;
  };
};

export async function getCourseDetails(slug: string) {
  const courseResponse = await fetch(`https://webapi-shiko-lms.azurewebsites.net/api/Courses/${slug}`);

  return courseResponse.json();
}

export default async function CourseDetailsReviewsPage({ params }: Props) {
  const { slug } = await params;

  const course = await getCourseDetails(slug);

  return (
    <div className="w-full">
      <CourseDetailsHero course={course}>
        <CourseDetailsReviews course={course} />
      </CourseDetailsHero>
    </div>
  );
}