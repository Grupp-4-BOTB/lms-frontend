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
async function getRatingSummary(courseId: number) {
  const response = await fetch(`https://webapp-ratings-richard-hvatdegdcyfkejda.swedencentral-01.azurewebsites.net/api/courses/${courseId}/ratings/summary`);

  return response.json();
}

export default async function CourseDetailsReviewsPage({ params }: Props) {
  const { slug } = await params;

  const course = await getCourseDetails(slug);

  const ratingSummary = await getRatingSummary(course.id);

  const courseWithRating = {
    ...course,
    rating: ratingSummary.averageRating,
    totalReviews: ratingSummary.totalReviews,
  };

  return (
    <div className="w-full">
      <CourseDetailsHero course={courseWithRating}>
        <CourseDetailsReviews course={courseWithRating} />
      </CourseDetailsHero>
    </div>
  );
}