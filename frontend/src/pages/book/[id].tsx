import Threads from "@/src/components/Threads";
import { useRouter } from "next/router";

export default function EachBook() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-32">
      <div className="flex space-x-8 justify-evenly">
        <div className="w-1/3 h-[32rem] bg-gray-300">
          <div className="">Image</div>
        </div>
        <div className="w-2/3">
          <div className="flex flex-col justify-between h-full divide-y-2 divide-solid">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Title of the book</h1>
              <h2 className="text-2xl font-semibold text-gray-900">Author of the book</h2>
              <h3 className="text-xl font-medium text-gray-900">Book genre</h3>
            </div>
            <div className="py-8">
              <p>some good description</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div>
          <h1 className="my-4 text-3xl font-black text-gray-900">Threads</h1>
        </div>
        <Threads />
      </div>
    </div>
  );
}
