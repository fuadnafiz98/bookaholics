import Threads from "@/src/components/Threads";
import Loading from "@/src/components/Loading";
import config from "@/src/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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

export default function EachThread() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [threadInfo, setThreadInfo] = useState<ThreadInfo | null>(null);
  const [replies, setReplies] = useState<ThreadInfo[] | null>([]);

  useEffect(() => {
    setLoading(true);
    async function fetchInfo() {
      try {
        let response = await fetch(config.API_URL + `/threads/${id}`);
        const data = await response.json();
        console.log(data);
        setThreadInfo(data.threadInfo);
        setReplies(data.replyInfo);
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
    <div className="m-32 space-y-8">
      {loading && <Loading />}
      {!loading && threadInfo != null && (
        <>
          <div className="">
            <h1 className="my-2 text-2xl font-bold">{threadInfo?.topic_name}</h1>
            <div className="py-4 text-lg bg-gray-50">
              <h2>{threadInfo?.topic_body}</h2>
            </div>
          </div>
          <div>
            <div className="flex text-lg font-medium text-gray-700">
              <div className="mr-2 hover:underline">{threadInfo?.comment_count} comments</div>• {threadInfo?.view_count}{" "}
              Views
            </div>
          </div>
          <div>
            <h1 className="my-4 text-2xl font-black">Replies</h1>
            <Threads book={null} threads={replies} parent_id={threadInfo.thread_id} />
          </div>
        </>
      )}
    </div>
  );
}
