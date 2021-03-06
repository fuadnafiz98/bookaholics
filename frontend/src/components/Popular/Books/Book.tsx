import Link from "next/link";

interface Props {
  data: {
    book_id: string;
    book_author: string;
    book_genre: string;
    book_img_url: string;
    book_short_description: string;
    book_thread_count: number;
    book_title: string;
  };
}

const Book: React.FC<Props> = ({ data }) => {
  return (
    <div className="">
      <Link href={`/book/${data.book_id}`}>
        <div className="hover:cursor-pointer">
          <div className="w-56 h-64 ">
            <img className="object-cover h-full" src={`${data.book_img_url}`} alt={`${data.book_title}`} />
          </div>
          <div>
            <h2>{data.book_title}</h2>
            <p>
              by <strong>{data.book_author}</strong>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Book;
