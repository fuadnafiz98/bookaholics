import Link from "next/link";
import Byte from "@/src/components/Byte";
import { useEffect } from "react";
import config from "@/src/config";
import useFetchPost from "@/src/hooks/useFetchPost";
import Loading from "@/src/components/Loading";

export default function Bytes() {
  const [response, loading, error] = useFetchPost(config.API_URL + "/bytes/fetch", {}, "POST");
  useEffect(() => {
    console.log(response);
  }, [response]);
  return (
    <>
      <div className="px-32 mt-16">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-600">Top Bytes</div>
          <div className="flex items-center px-4 py-2 space-x-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
            <img src="/assets/plus.svg" alt="plus svg" className="w-4 h-4" />
            <Link href="/bytes/new">
              <strong className="text-xl font-medium text-gray-800">Add New</strong>
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="grid h-16 place-content-center">
            <Loading />
          </div>
        ) : (
          <></>
        )}
        {!loading && (
          <>
            <div className="mt-4 divide-y-4 divide-gray-300 divide-dotted">
              {response && response.map((res) => <Byte data={res} key={res.byte_id} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}
