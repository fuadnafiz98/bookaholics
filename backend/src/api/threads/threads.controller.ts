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
    return res.json(JSON.parse(response.body)[0]);
  } catch (err) {
    throw new Error(err);
  }
};

const getAll = (req: Request, res: Response) => {};

const addOne = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  try {
    await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "insert",
        schema: "dev",
        table: "threads",
        records: [
          {
            // TODO: add current user
            user_id: data.user_id,
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