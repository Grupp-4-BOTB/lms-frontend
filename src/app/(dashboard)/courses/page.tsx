import PopularCourseCard from "@/components/courses/PopularCourseCard";
import AllCourseCard from "@/components/courses/AllCourseCard";


// ------- MOCK data  Popular Courses -----------
const popularCourses = [
  {
    id: 1,
    title: "Graphic Design",
    description: "Creating Visual Content",
    icon: "/images/courses/course-icon1.svg",
    href: "/courses"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Combines User Interface (UI)",
    icon: "/images/courses/course-icon2.svg",
    href: "/courses"
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "The Collection of Visual",
    icon: "/images/courses/course-icon3.svg",
    href: "/courses"
  },
  {
    id: 4,
    title: "Web Design",
    description: "Process of Creating Websites",
    icon: "/images/courses/course-icon4.svg",
    href: "/courses"
  }
];

// ------- MOCK data All Courses -----------
const allCourses = [
  {
    id: 1,
    courseImage: "/images/courses/art-image.svg",
    title: "Artificial Intelligence",
    instructorImg: "/images/courses/samantha.svg",
    instructorName: "Samantha William",
    rating: 5.0,
    lessonsCount: 15,
    href: "/courses"
  },
  {
    id: 2,
    courseImage: "/images/courses/data-image.svg",
    title: "Data Science & Analytics",
    instructorImg: "/images/courses/Karen.svg",
    instructorName: "Karen Hope",
    rating: 4.7,
    lessonsCount: 25,
    href: "/courses"
  },
  {
    id: 3,
    courseImage: "/images/courses/digital-image.svg",
    title: "Digital Marketing",
    instructorImg: "/images/courses/Jack.svg",
    instructorName: "Jack Sally",
    rating: 5.0,
    lessonsCount: 5,
    href: "/courses"
  },
  {
    id: 4,
    courseImage: "/images/courses/ux-image.svg",
    title: "UI/UX Design for Beginner",
    instructorImg: "/images/courses/Johnny.svg",
    instructorName: "Johnny Ahmed",
    rating: 5.0,
    lessonsCount: 34,
    href: "/courses"
  },
  {
    id: 5,
    courseImage: "/images/courses/fullstack-image.svg",
    title: "Full stack Developer",
    instructorImg: "/images/courses/Hasan.svg",
    instructorName: "Hasan Mahmud",
    rating: 4.7,
    lessonsCount: 30,
    href: "/courses"
  },
  {
    id: 6,
    courseImage: "/images/courses/sketch-image.svg",
    title: "Sketch for Designer",
    instructorImg: "/images/courses/Jasmin.svg",
    instructorName: "Jasmin Lila",
    rating: 4.5,
    lessonsCount: 16,
    href: "/courses"
  }
];

export default function CoursesPage() {
  return (

    <section className="px-3 pb-6 rounded-2xl space-y-10 mx-auto">
            {/* ----------- Popular Courses Section ---------- */}

            <div className="px-5 py-6 bg-pink-100 rounded-2xl space-y-4">
                <h2 className="font-semibold text-3xl">Popular This Week</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {popularCourses.map((course) => (
                        <PopularCourseCard
                            key={course.id}
                            title={course.title}
                            description={course.description}
                            icon={course.icon}
                            href={course.href}
                        />
                    ))}
                </div>
            </div>


            {/* ----------- All Courses Section ---------- */}
            <div className="py-6 space-y-4">
              <div className="flex items-center justify-between py-2 px-4">
                <h2 className="font-semibold text-3xl">All Courses</h2>
                <p className="text-base">See All</p>

              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">


                    {allCourses.map((course) => (
                        <AllCourseCard
                            key={course.id}
                            courseImage={course.courseImage}
                            title={course.title}
                            instructorImg={course.instructorImg}
                            instructorName={course.instructorName}
                            rating={course.rating}
                            lessonsCount={course.lessonsCount}
                            href={course.href}
                        />
                    ))}
                </div>
            </div>
    </section>
  );
}