import { useRouter } from "next/router";

export default function EachByte() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="m-32 bg-gray-50">
      <div className="px-16 py-16 text-2xl font-medium text-center text-gray-800 hover:cursor-pointer overflow-ellipsis">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque enim explicabo hic perspiciatis nulla eaque sed
        cum impedit saepe tempora.
      </div>
      <div className="flex items-center justify-between mt-16">
        <div className="flex items-center justify-around space-x-4">
          <div className="flex items-center p-4 space-x-4 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
            <img src="/assets/love.svg" alt="love svg" className="w-6 h-6" />
            <button className="text-xl font-medium">Like</button>
          </div>
          <div className="flex items-center p-4 space-x-4 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
            <img src="/assets/share.svg" alt="share svg" className="w-6 h-6" />
            <button className="text-xl font-medium">Share</button>
          </div>
        </div>
        <div className="text-xl font-medium">
          by <strong>username</strong>
        </div>
      </div>
    </div>
  );
}
