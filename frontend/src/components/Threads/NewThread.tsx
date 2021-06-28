import { useContext, useState } from "react";
import config from "@/src/config";
import Loading from "../Loading";
import Error from "../Error";
import Success from "../Success";
import { AuthContext } from "@/src/context/AuthContext";

interface Props {
  book_id: string | null;
  parent: string | null;
}

const NewThread: React.FC<Props> = ({ book_id = null, parent = null }) => {
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const auth = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!auth?.isAuthenticated) return;
    if (topic == "" || body == "") return;
    setLoading(true);
    const response = await fetch(config.API_URL + "/threads/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: auth.authState.userInfo.userId,
        book_id: book_id,
        parent: parent,
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
  };

  return (
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
  );
};

export default NewThread;
