import { MouseEventHandler, useState } from "react";
import config from "@/src/config/index";
import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
import Success from "@/src/components/Success";

export default function NewByte() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [quote, setQuote] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    console.log(bookName, authorName, quote);
    setLoading(true);
    if (bookName == "" || authorName == "" || quote == "") {
      setLoading(false);
      return;
    }

    // TODO: add specific userID!
    // TODO: add comment inside the object and handle error in backend.
    const newByte = {
      author: authorName,
      book_name: bookName,
      image_url: null,
      love_count: 0,
      quote: quote,
      user_id: "76cbc6e2-d481-4fac-9eeb-a79ce52b9e37",
    };
    try {
      const response = await fetch(config.API_URL + "/bytes/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newByte),
      });
      const data = await response.json();
      setLoading(false);
      setSuccess(true);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="m-32 space-y-4 text-gray-900">
      {error && <Error message={error} />}
      {success && <Success message="Inserted Successfully!" />}
      <div className="text-3xl font-black text-gray-600">Add New Byte</div>
      <div className="flex flex-col mt-4 space-y-2">
        <label className="text-xl font-medium" htmlFor="bookName">
          Book Name
        </label>
        <input
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
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
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
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
          value={quote}
          id="quote"
          onChange={(e) => setQuote(e.target.value)}
          placeholder="enter the quote here..."
          className="w-full h-32 border border-gray-300 resize-none form-textarea"
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-32 h-12 text-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300"
        >
          {loading && <Loading />}
          Submit
        </button>
      </div>
    </div>
  );
}
