import Link from "next/link";

interface Props {
  id: string;
}

const Thread: React.FC<Props> = ({ id }) => {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-center justify-center w-1/12 h-32 space-y-3 bg-gray-50">
          <button className="grid w-8 h-8 hover:bg-gray-300 place-content-center">
            <img className="w-6 h-6" src="/assets/up.svg" alt="up svg" />
          </button>
          <p className="text-xl text-gray-800">12</p>
          <button className="grid w-8 h-8 hover:bg-gray-300 place-content-center">
            <img className="w-6 h-6" src="/assets/down.svg" alt="down svg" />
          </button>
        </div>
        <div className="flex flex-col w-full ml-8 justify-evenly">
          <h2 className="text-xl font-bold text-gray-800">
            <Link href={`/thread/${id}`}>Topic Name</Link>
          </h2>
          <div className="flex text-lg font-medium text-gray-700">
            by username • 12/2/2021 @ 12.21 PM •
            <div className="hover:underline">
              <Link href="/threads/1"> 11 comments</Link>
            </div>
            • 300 Views
          </div>
        </div>
      </div>
    </>
  );
};

export default Thread;
