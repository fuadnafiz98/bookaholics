import Threads from "@/src/components/Threads";
import { useRouter } from "next/router";

export default function EachThread() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="m-32 space-y-8">
      <div className="">
        <h1 className="my-2 text-2xl font-bold">Topic Name</h1>
        <div className="text-lg bg-gray-200">
          <h2>Topic body</h2>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Add Comment</h2>
        </div>
        <div className="h-48">
          <textarea className="w-full h-full border border-gray-300 resize-none form-textarea" />
        </div>
        <div>
          <button className="w-32 h-12 text-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300">Submit</button>
        </div>
      </div>
      <div>
        <h1 className="my-4 text-2xl font-black">Replies</h1>
        <Threads />
      </div>
    </div>
  );
}
