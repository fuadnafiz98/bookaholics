import Link from "next/link";

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

interface Props {
  data: ThreadInfo;
}

const Thread: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-center justify-center w-1/12 h-32 space-y-3 bg-gray-50">
          <div className="flex items-center space-x-2">
            <button className="grid w-8 h-8 hover:bg-gray-300 place-content-center">
              <img className="flex items-center justify-center w-6 h-6" src="/assets/up.svg" alt="up svg" />
            </button>
            <p className="text-lg font-medium text-gray-800">{data.upvote}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="grid w-8 h-8 hover:bg-gray-300 place-content-center">
              <img className="flex items-center justify-center w-6 h-6" src="/assets/down.svg" alt="down svg" />
            </button>
            <p className="text-lg font-medium text-gray-600">{data.downvote}</p>
          </div>
        </div>
        <div className="flex flex-col w-full ml-8 justify-evenly">
          <h2 className="text-xl font-bold text-gray-800">
            <Link href={`/thread/${data.id}`}>{data.topic_name}</Link>
          </h2>
          <div className="flex text-lg font-medium text-gray-700">
            by • {new Date(data.date).toTimeString()} •
            <div className="hover:underline">{data.comment_count} comments</div>• {data.view_count} Views
          </div>
        </div>
      </div>
    </>
  );
};

export default Thread;
