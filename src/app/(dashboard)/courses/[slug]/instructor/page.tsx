import CourseDetailsInstructor from "@/components/courses/details/CourseDetailsInstructor";
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
async function getInstructor(slug: string) {
  const instructorResponse = await fetch(`https://webapi-shiko-lms.azurewebsites.net/api/Courses/${slug}/instructor`);
  return instructorResponse.json(); 
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
  const instructor = await getInstructor(slug);
  const ratingData = await getRating(course.id);

  course.rating = ratingData.averageRating;
  course.totalReviews = ratingData.totalReviews;
  
  return (
    <div className="w-full">
        <CourseDetailsHero course={course}>
          <CourseDetailsInstructor 
            slug={slug} 
            course={course} 
            instructor={instructor}
          />
        </CourseDetailsHero>
    </div>
  );
}
