import Link from "next/link";
import Threads from "@/src/components/Threads";

export default function Bytes() {
  return (
    <>
      <div className="px-32 mt-16">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-600">Top Threds</div>
          <div className="flex items-center px-4 py-2 space-x-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
            <img src="/assets/plus.svg" alt="plus svg" className="w-4 h-4" />
            <Link href="/thread/new">
              <strong className="text-xl font-medium text-gray-600">Add New</strong>
            </Link>
          </div>
        </div>
        <div>
          <Threads />
        </div>
      </div>
    </>
  );
}
