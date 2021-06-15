export default function Books() {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="py-4 text-2xl font-semibold">Popular Books</div>
          <a className="text-xl font-semibold hover:underline" href="http://">
            Load More
          </a>
        </div>
        {/* TODO: write book component */}
        <div className="flex justify-between">
          <div>
            <div className="w-56 h-64 bg-gray-200"></div>
            <div>
              <h2>Deep Work</h2>
              <p>
                by <strong>Lorem, ipsum</strong>
              </p>
            </div>
          </div>
          <div className="w-56 h-64 bg-gray-200"></div>
          <div className="w-56 h-64 bg-gray-200"></div>
          <div className="w-56 h-64 bg-gray-200"></div>
          <div className="w-56 h-64 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
