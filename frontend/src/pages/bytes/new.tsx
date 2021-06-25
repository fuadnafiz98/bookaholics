export default function NewByte() {
  return (
    <div className="m-32 space-y-4 text-gray-900">
      <div className="text-3xl font-black text-gray-600">Add New Byte</div>
      <div className="flex flex-col mt-4 space-y-2">
        <label className="text-xl font-medium" htmlFor="bookName">
          Book Name
        </label>
        <input
          type="text"
          id="bookName"
          placeholder="enter book name..."
          className="w-full h-full border border-gray-300 resize-none form-input"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-medium" htmlFor="authorName">
          Author Name
        </label>
        <input
          type="text"
          id="authorName"
          placeholder="enter author name..."
          className="w-full h-full border border-gray-300 resize-none form-input"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-medium" htmlFor="quote">
          Quote
        </label>
        <textarea
          id="quote"
          placeholder="enter the quote here..."
          className="w-full h-32 border border-gray-300 resize-none form-textarea"
        />
      </div>
      <div>
        <button className="w-32 h-12 text-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300">Submit</button>
      </div>
    </div>
  );
}
