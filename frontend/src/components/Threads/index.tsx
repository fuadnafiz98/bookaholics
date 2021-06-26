import config from "@/src/config";
import { useState } from "react";
import Error from "../Error";
import Success from "../Success";
import Loading from "../Loading";
import Thread from "./Thread";

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

interface Props {
  threads: ThreadInfo[] | null;
  book: Book | null;
}

const Threads: React.FC<Props> = ({ book, threads }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (topic == "" || body == "") return;
    setLoading(true);
    const response = await fetch(config.API_URL + "/threads/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // TODO: add custom userID
      body: JSON.stringify({
        user_id: "ee926269-3da8-44fb-b425-97db352537e6",
        book_id: book?.book_id,
        parent: "book",
        parent_id: null,
        topic_name: topic,
        topic_body: body,
        date: `${Date.now()}`,
        view_count: 0,
        comment_count: 0,
        upvote: 0,
        downvote: 0,
      }),
    });
    const data = await response.json();
    console.log(data);
    setLoading(false);
    setSuccess(true);
    setShowAddNew(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowAddNew(!showAddNew)}
        className="w-32 h-12 text-xl font-bold text-gray-600 bg-gray-200"
      >
        Add New
      </button>
      {/* TODO: extract add new thread */}
      {showAddNew && (
        <div className="my-8 space-y-4 text-gray-900">
          {error && <Error message={error} />}
          {success && <Success message="Inserted Successfully!" />}
          <div className="text-3xl font-black text-gray-600">Create New Thread</div>
          <div className="flex flex-col mt-4 space-y-2">
            <label className="text-xl font-medium" htmlFor="topicName">
              Topic
            </label>
            <input
              type="text"
              id="topicName"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="enter topic name..."
              className="w-full h-full border border-gray-300 resize-none form-input"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-medium" htmlFor="topic">
              Topic Body
            </label>
            <textarea
              id="topic"
              placeholder="enter the topic here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-32 border border-gray-300 resize-none form-textarea"
            />
          </div>
          {/* <div>
            <button
              onClick={handleSubmit}
              className="w-32 h-12 text-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300"
            >
              Submit
            </button>
          </div> */}
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
      )}
      <div className="divide-y-2 divide-gray-200 divide-dashed">
        {threads?.map((thread) => (
          <Thread key={thread.id} data={thread} />
        ))}
      </div>
    </div>
  );
};

export default Threads;
