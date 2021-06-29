import Link from "next/link";

export default function Welcome() {
  return (
    <div className="grid w-full h-screen space-y-8 place-content-center">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-black text-gray-700">Bookaholics</h1>
      </div>
      <img className="w-12 h-64" src="/assets/home.svg" alt="home image" />
      <div className="flex items-center justify-center">
        <div className="text-xl font-bold text-gray-900 hover:underline">
          <Link href="/auth/signup">GET STARTED</Link>
        </div>
      </div>
    </div>
  );
}
