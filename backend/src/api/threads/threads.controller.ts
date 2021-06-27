import { Request, Response } from "express";
import config from "../../config/index";
import fetch from "../../loaders/got";

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let response = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: `select * from dev.threads where thread_id='${id}'`,
      }),
    });
    let replyResponse = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: `select * from dev.threads where parent_id='${id}'`,
      }),
    });
    return res.json({
      threadInfo: JSON.parse(response.body)[0],
      replyInfo: JSON.parse(replyResponse.body),
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    let response = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: "select * from dev.threads where parent is null and parent_id is null order by __createdtime__ desc",
      }),
    });
    return res.json(JSON.parse(response.body));
  } catch (err) {
    throw new Error(err);
  }
};

interface ThreadInsertResponse {
  message: string;
  inserted_hashes: string[];
  skipped_hashes: string[];
}

const addOne = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  try {
    let ret = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "insert",
        schema: "dev",
        table: "threads",
        records: [
          {
            user_id: data.user_id,
            parent: data.parent,
            parent_id: data.parent_id,
            topic_name: data.topic_name,
            topic_body: data.topic_body,
            date: data.date,
            view_count: data.view_count,
            comment_count: data.comment_count,
            upvote: data.upvote,
            downvote: data.downvote,
          },
        ],
      }),
    });

    if (data.parent == "book" && data.parent_id == null) {
      let body: ThreadInsertResponse = await JSON.parse(ret.body);
      console.log(body.inserted_hashes[0]);

      await fetch.post(config.harperdbURL, {
        body: JSON.stringify({
          operation: "insert",
          schema: "dev",
          table: "books_threads",
          records: [
            {
              thread_id: body.inserted_hashes[0],
              book_id: data.book_id,
            },
          ],
        }),
      });
    }

    return res.json({
      status: 200,
      message: "new thread created",
    });
  } catch (err) {
    throw new Error(err);
  }
};

const updateOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  try {
    if (data.topic_name == null || data.topic_body == null) return res.end();
    await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: `update dev.threads set topic_name=COALESCE('${data.topic_name}', topic_name), topic_body=COALESCE('${data.topic_body}', topic_body) where thread_id='${id}'`,
      }),
    });
    return res.json({
      status: 201,
      message: "thead updated",
    });
  } catch (err) {
    throw new Error(err);
  }
};

const deleteOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "sql",
      sql: `delete from dev.threads where thread_id='${id}'`,
    }),
  });
  // delete the child nodes also
  // TODO find on delete cascasde available or not
  await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "sql",
      sql: `delete from dev.threads where parent_id='${id}'`,
    }),
  });
  return res.json({
    status: 201,
    message: "thead deleted",
  });
};

export default {
  addOne,
  deleteOne,
  getOne,
  getAll,
  updateOne,
};
