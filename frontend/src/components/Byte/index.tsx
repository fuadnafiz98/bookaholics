import config from "@/src/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../Loading";

interface Props {
  data: {
    byte_id: string;
    love_count: number;
    quote: string;
    book_name: string;
    user_id: string;
    image_url: string | null;
    author: string;
    name: string;
  };
}

const Byte: React.FC<Props> = ({ data }) => {
  const [loveCount, setLoveCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoveCount(data.love_count);
  }, []);

  const handleCount = async () => {
    setLoading(true);
    console.log("increase");
    try {
      const response = await fetch(config.API_URL + "/bytes/love?inc=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          byte_id: data.byte_id,
          user_id: data.user_id,
        }),
      });
      const { inc } = await response.json();
      if (inc == "true") setLoveCount((count) => count + 1);
      else setLoveCount((count) => count - 1);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-gray-900 bg-gray-50">
      <div className="px-4 py-12 text-xl font-medium text-center text-gray-800 hover:cursor-pointer overflow-ellipsis">
        {data.quote}
      </div>
      <div className="px-2 text-xl text-center text-gray-500 overflow-ellipsis">
        From <strong>{data.book_name} </strong>by <strong>{data.author}</strong>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-around space-x-4">
          <div
            onClick={handleCount}
            className="flex items-center p-4 space-x-4 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
          >
            <img src="/assets/love.svg" alt="love svg" className="w-6 h-6" />
            {loading && <Loading />}
            <button className="text-xl font-medium">{loveCount}</button>
          </div>
          <div className="flex items-center p-4 space-x-4 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
            <img src="/assets/share.svg" alt="share svg" className="w-6 h-6" />
            <button className="text-xl font-medium">Share</button>
          </div>
        </div>
        <div className="mr-2 text-xl font-medium">
          by <strong>{data.name}</strong>
        </div>
      </div>
    </div>
  );
};

export default Byte;
