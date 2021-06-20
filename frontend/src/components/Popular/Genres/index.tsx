import Genre from "./Genre";

export default function Genres() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="py-4 text-2xl font-semibold">Popular Genres</div>
        <a className="text-xl font-semibold hover:underline" href="http://">
          Load More
        </a>
      </div>
      <div>
        <div className="flex justify-between">
          <Genre id="1" />
          <Genre id="2" />
          <Genre id="3" />
        </div>
      </div>
    </div>
  );
}
