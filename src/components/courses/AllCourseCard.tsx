type Props = {
    title: string;
};

export default function AllCourseCard({ title }: Props) {
  return (

      <div>
        <h3 className="font-semibold">{title}</h3>
      </div>

  );
}