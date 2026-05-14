type ReviewFormProps = {
  courseId: number;
  studentId: number;
  onReviewSubmitted: () => Promise<void>;
};

export default function ReviewForm({courseId, studentId, onReviewSubmitted,}: ReviewFormProps) {

  return <div>Review Form</div>;

}