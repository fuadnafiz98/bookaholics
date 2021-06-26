import { Request, Response } from "express";
import config from "../../config";
import fetch from "../../loaders/got";

const insertQuote = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  try {
    await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "insert",
        schema: "dev",
        table: "bytes",
        records: [
          {
            user_id: data.user_id,
            book_name: data.book_name,
            author: data.author,
            quote: data.quote,
            image_url: data.image_url,
            love_count: 0,
          },
        ],
      }),
    });
    return res.json({
      status: 200,
      message: "byte inserted!",
    });
  } catch (err) {
    console.log("error at bytes.controller.ts");
    throw new Error(err);
  }
};

const increaseLove = async (req: Request, res: Response) => {
  let { inc = "true" } = req.query;
  try {
    const { user_id, byte_id } = req.body;
    let response = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: ` select * from dev.user_byte where user_id='${user_id}' and byte_id='${byte_id}'`,
      }),
    });
    let isLiked = await response.body;
    if (isLiked === "[]") {
      inc = "true";
      await fetch.post(config.harperdbURL, {
        body: JSON.stringify({
          operation: "insert",
          schema: "dev",
          table: "user_byte",
          records: [
            {
              user_id,
              byte_id,
            },
          ],
        }),
      });
    } else {
      inc = "false";
      await fetch.post(config.harperdbURL, {
        body: JSON.stringify({
          operation: "sql",
          sql: `delete from dev.user_byte where user_id='${user_id}' and byte_id='${byte_id}'`,
        }),
      });
    }

    await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql:
          inc === "true"
            ? `update dev.bytes set love_count = love_count + 1 where byte_id = '${byte_id}'`
            : ` update dev.bytes set love_count = love_count - 1 where byte_id = '${byte_id}'`,
      }),
    });

    return res.json({
      status: 200,
      inc,
      message: "love count updated",
    });
  } catch (err) {
    throw new Error(err);
  }
};

const fetchData = async (req: Request, res: Response) => {
  try {
    let data = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: "select bytes.byte_id, bytes.love_count, bytes.quote, bytes.book_name, users.user_id, bytes.image_url, bytes.author, users.name from dev.bytes join dev.users where bytes.user_id=users.user_id order by bytes.__createdtime__ desc limit 20",
      }),
    });
    data = JSON.parse(data.body);
    return res.json(data);
  } catch (err) {
    throw new Error(err);
  }
};

export { insertQuote, increaseLove, fetchData };
