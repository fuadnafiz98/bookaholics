import Link from "next/link";

interface Props {
  name: string | undefined;
  handleSignOut: () => Promise<void>;
}

const Navbar: React.FC<Props> = ({ name, handleSignOut }) => {
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
        {name == undefined ? (
          <div className="flex space-x-2 font-bold text-gray-700 ">
            <Link href="/auth/signup">
              <div className="grid px-4 py-2 bg-gray-200 place-content-center hover:cursor-pointer hover:bg-gray-300">
                Signup
              </div>
            </Link>
            <Link href="/auth/signin">
              <div className="grid px-4 py-2 bg-gray-200 place-content-center hover:cursor-pointer hover:bg-gray-300">
                Signin
              </div>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between space-x-4 text-lg font-medium">
              <div>{name}</div>
              <button
                onClick={handleSignOut}
                className="grid px-4 py-2 font-medium bg-gray-200 place-content-center hover:cursor-pointer hover:bg-gray-300"
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
