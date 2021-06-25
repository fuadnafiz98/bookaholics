import Book from "./Book";

export default function Books() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="py-4 text-2xl font-semibold">Popular Books</div>
        <a className="text-xl font-semibold hover:underline" href="http://">
          Load More
        </a>
      </div>
      <div>
        <div className="flex justify-between">
          <Book id="1" />
          <Book id="2" />
          <Book id="3" />
        </div>
      </div>
    </div>
  );
}