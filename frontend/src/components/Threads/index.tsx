import config from "@/src/config";
import React, { useState, useContext } from "react";
import Error from "../Error";
import Success from "../Success";
import Loading from "../Loading";
import Thread from "./Thread";
import { AuthContext } from "@/src/context/AuthContext";

interface ThreadJoinInfo {
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

interface ThreadInfo {
  thread_id: string;
  __createdtime__: number;
  downvote: number;
  view_count: number;
  topic_body: string;
  date: number;
  user_id: string;
  comment_count: number;
  upvote: number;
  __updatedtime__: number;
  parent_id?: null;
  topic_name: string;
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
  threads: ThreadJoinInfo[] | ThreadInfo[] | null;
  book: Book | null;
  parent_id: string | null;
}

const Threads: React.FC<Props> = ({ book, threads, parent_id = null }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const auth = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!auth?.isAuthenticated) return;
    if (topic === "" || body === "") return;
    setLoading(true);
    const response = await fetch(config.API_URL + "/threads/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: auth.authState.userInfo.userId,
        // @ts-ignore
        book_id: book === null ? book?.book_id : null,
        parent: book !== null ? "book" : null,
        parent_id: parent_id,
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
          <Thread key={thread.thread_id} data={thread} />
        ))}
      </div>
    </div>
  );
};

export default Threads;
