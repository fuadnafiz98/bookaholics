import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-around w-full h-16 py-4 bg-gray-100">
        <Link href="/">
          <div className="text-2xl font-black font-gray-700 hover:cursor-pointer">Bookaholics</div>
        </Link>
        <div className="flex space-x-12 text-xl font-semibold font-gray-700">
          <Link href="/bytes">
            <div className="px-8 py-4 hover:cursor-pointer hover:bg-gray-200">Bites</div>
          </Link>
          <Link href="/thread">
            <div className="px-8 py-4 hover:cursor-pointer hover:bg-gray-200">Discussions</div>
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-4 text-lg font-medium">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div>username</div>
        </div>
      </div>
    </>
  );
}
