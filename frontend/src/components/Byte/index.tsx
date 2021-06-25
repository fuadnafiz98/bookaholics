import Link from "next/link";

export default function Byte() {
  return (
    <div className="text-gray-900 bg-gray-50">
      <Link href="/bytes/1">
        <div className="px-4 py-12 text-xl font-medium text-center text-gray-800 hover:cursor-pointer overflow-ellipsis">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolores illo repellendus esse velit
          repudiandae, dolore rerum optio mollitia ipsa. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Nulla, soluta!
        </div>
      </Link>
      <div className="flex items-center justify-between">
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
