import Link from "next/link";
import Threads from "@/src/components/Threads";
import Thread from "@/src/components/Threads/Thread";
import config from "@/src/config";
import Loading from "@/src/components/Loading";
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

export default function Discussion() {
  const [loading, setLoading] = useState(false);
  const [threads, setThreads] = useState<ThreadInfo[] | null>(null);
  useEffect(() => {
    setLoading(true);
    async function fetchInfo() {
      try {
        let response = await fetch(config.API_URL + `/threads/`);
        const data = await response.json();
        console.log(data);
        setThreads(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInfo();
  }, []);
  return (
    <>
      <div className="px-32 mt-16">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-600">Top Threads</div>
          <div className="flex items-center px-4 py-2 space-x-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
            <img src="/assets/plus.svg" alt="plus svg" className="w-4 h-4" />
            <Link href="/thread/new">
              <strong className="text-xl font-medium text-gray-600">Add New</strong>
            </Link>
          </div>
        </div>
        {loading && (
          <div className="grid h-12 place-content-center">
            <Loading />
          </div>
        )}
        {!loading && threads && (
          <div className="divide-y-2 divide-gray-300 divide-dashed">
            {threads.map((thread) => (
              <Thread data={thread} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
