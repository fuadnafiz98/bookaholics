import Link from "next/link";
import Threads from "@/src/components/Threads";
import Thread from "@/src/components/Threads/Thread";
import config from "@/src/config";
import Loading from "@/src/components/Loading";
import { useCallback, useState, useRef, useEffect } from "react";
import Auth from "@/src/components/Auth";

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
  const mountedRef = useRef(true);

  //TODO: checkthis

  const fetchInfo = useCallback(async () => {
    try {
      setLoading(true);
      let response = await fetch(config.API_URL + `/threads/`);
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (!mountedRef.current) return null;
      setThreads(data);
    } catch (error) {
      console.error(error);
    }
  }, [mountedRef]);

  useEffect(() => {
    fetchInfo();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchInfo]);

  return (
    <Auth>
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
              {threads.map((thread, i) => (
                <Thread data={thread} key={i} />
              ))}
            </div>
          )}
        </div>
      </>
    </Auth>
  );
}
