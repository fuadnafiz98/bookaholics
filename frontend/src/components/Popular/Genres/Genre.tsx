import Link from "next/link";

interface Props {
  id: string;
}

const Genre: React.FC<Props> = ({ id }) => {
  return (
    <>
      <Link href={`/genre/${id}`}>
        <div className="hover:cursor-pointer">
          <div className="w-56 h-64 bg-gray-200"></div>
          <div>
            <h2>Deep Work</h2>
            <p>
              by <strong>Lorem, ipsum</strong>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Genre;
