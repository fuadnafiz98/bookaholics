import { useContext, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Success from "@/src/components/Success";
import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
import config from "@/src/config";

interface Props {}
const signIn: React.FC<Props> = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(name, password);
    if (name == "" || password == "") return;

    try {
      setLoading(true);
      const response = await fetch(config.API_URL + "/auth/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const { data } = await response.json();
      console.log(data);
      authContext?.setAuthState(data);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/");
      }, 2000);
    } catch (err) {
      console.log("error at signIn");
      console.log(err);
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
        router.reload();
      }, 3000);
    }
  };

  return (
    <div className="grid h-screen px-32 place-content-center">
      {success && <Success message="Sign In Successful!" />}
      {error && <Error message="Sign In failed!" />}
      <h1 className="text-3xl font-black text-center text-gray-800">SIGN IN</h1>
      <form className="m-8 space-y-4 form-input" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <label className="m-2 text-xl font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="m-2 text-xl font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="m-2 text-gray-600">
          <p>
            Don't have a account?
            <strong>
              <Link href="/auth/signup">Sign Up</Link>
            </strong>
          </p>
        </div>
        <button
          className="flex items-center justify-between px-4 py-3 m-2 font-bold bg-gray-500 text-gray-50 hover:cursor-pointer hover:bg-gray-700 hover:text-white "
          type="submit"
        >
          {loading && <Loading />}
          Sign in
        </button>
      </form>
    </div>
  );
};

export default signIn;
