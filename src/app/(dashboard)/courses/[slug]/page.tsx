import CourseDetailsOverview from "@/components/courses/details/CourseDetailsOverview";
import CourseDetailsHero from "@/components/courses/details/CourseDetailsHero";

type Props = {
  params: {
    slug: string;
  };
};

async function getCourseDetails(slug: string) {
  const courseResponse = await fetch(`https://webapi-shiko-lms.azurewebsites.net/api/Courses/${slug}`);

  return courseResponse.json();
}

// Hämtar rating från Rating API med hjälp av courseId som skickas in genom mapningen i page.tsx,
// RatingData används sedan för att visa averageRating och totalReviews i CourseDetailsHero.
async function getRating(courseId: string) {
  const RatingResponse = await fetch(`https://webapp-ratings-richard-hvatdegdcyfkejda.swedencentral-01.azurewebsites.net/api/courses/${courseId}/ratings/summary`);
  
  if (!RatingResponse.ok) {
    return {
      averageRating: 0,
      totalReviews: 0,
    };
  }
  return RatingResponse.json();
}

export default async function CourseDetailsPage({ params }: Props) {

  const { slug } = await params;

  const course = await getCourseDetails(slug);
  const ratingData = await getRating(course.id);

  course.rating = ratingData.averageRating;
  course.totalReviews = ratingData.totalReviews;

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
