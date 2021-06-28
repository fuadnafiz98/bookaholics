import Head from "next/head";

import Trending from "@/src/components/Trending";
import Books from "../components/Popular/Books";
import Genres from "../components/Popular/Genres";
import Navbar from "../components/Navbar";
import Auth from "../components/Auth";

export default function Home() {
  return (
    <>
      <Head>
        <title>@ts-next</title>
      </Head>
      <Auth>
        <div className="flex justify-between px-32 space-x-8">
          <Trending />
          <div className="flex-grow space-y-16">
            <Books />
            <Genres />
          </div>
        </div>
      </Auth>
    </>
  );
}
