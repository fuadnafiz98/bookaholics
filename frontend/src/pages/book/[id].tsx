import Threads from "@/src/components/Threads";
import config from "@/src/config";
import useFetch from "@/src/hooks/useFetch";
import Loading from "@/src/components/Loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Book {
  __updatedtime__: number;
  book_img_url: string;
  book_genre: string;
  book_author: string;
  book_title: string;
  book_short_description: string;
  book_thread_count: number;
  book_id: string;
  __createdtime__: number;
}

interface ThreadInfo {
  thread_id: string;
  __createdtime__: number;
  downvote: number;
  view_count: number;
  topic_body: string;
  date: number;
  user_id: number;
  comment_count: number;
  upvote: number;
  __updatedtime__: number;
  parent_id?: null;
  topic_name: string;
  book_id: string;
  thread_id1: string;
  id: string;
  __createdtime__1: number;
  __updatedtime__1: number;
}

interface dataType {
  bookInfo: Book[];
  bookThreadInfo: ThreadInfo[];
}

export default function EachBook() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [thread, setThread] = useState<ThreadInfo[] | null>(null);

  useEffect(() => {
    setLoading(true);
    async function fetchInfo() {
      try {
        let response = await fetch(config.API_URL + `/books/${id}`);
        let data: dataType = await response.json();
        console.log(data.bookInfo[0]);
        console.log(data.bookThreadInfo[0]);
        setBook(data.bookInfo[0]);
        setThread(data.bookThreadInfo);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    if (id != undefined) {
      fetchInfo();
    }
  }, [id]);

  return (
    <div className="p-32">
      {loading && (
        <div className="grid h-24 place-content-center">
          <Loading />
        </div>
      )}
      {!loading && book != undefined && (
        <>
          <div className="flex space-x-8 justify-evenly">
            <div className="w-1/3 h-[32rem] grid place-content-center">
              <img className="object-contain h-full" src={book.book_img_url} alt={book.book_title} />
            </div>
            <div className="w-2/3">
              <div className="flex flex-col justify-between h-full divide-y-2 divide-solid">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">{book.book_title}</h1>
                  <h2 className="text-2xl font-semibold text-gray-900">{book.book_author}</h2>
                  <h3 className="text-xl font-medium text-gray-900">{book.book_genre}</h3>
                </div>
                <div className="py-8">
                  <p>{book.book_short_description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div>
              <h1 className="my-4 text-3xl font-black text-gray-900">Threads</h1>
            </div>
            <Threads book={book} threads={thread} />
          </div>
        </>
      )}
    </div>
  );
}
