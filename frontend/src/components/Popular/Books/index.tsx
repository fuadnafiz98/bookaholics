import config from "@/src/config";
import useFetch from "@/src/hooks/useFetch";
import { useEffect } from "react";
import Loading from "../../Loading";
import Book from "./Book";

export default function Books() {
  const [response, loading, error] = useFetch(config.API_URL + "/books");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="py-4 text-2xl font-semibold">Popular Books</div>
        <a className="text-xl font-semibold hover:underline" href="http://">
          Load More
        </a>
      </div>
      {loading && (
        <div className="grid h-24 place-content-center">
          <Loading />
        </div>
      )}
      <div>
        <div className="flex flex-wrap justify-between overflow-y-visible">
          {response && response.data.map((book) => <Book data={book} />)}
        </div>
      </div>
    </div>
  );
}
