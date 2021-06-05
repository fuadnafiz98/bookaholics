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
  const { inc = "true" } = req.query;
  try {
    const { user_id, byte_id } = req.body;
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
        sql: "select * from dev.bytes join dev.users where bytes.user_id=users.user_id limit 20",
      }),
    });
    data = JSON.parse(data.body);
    return res.json(data);
  } catch (err) {
    throw new Error(err);
  }
};

export { insertQuote, increaseLove, fetchData };
