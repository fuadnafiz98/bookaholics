import { Request, Response } from "express";
import config from "../../config/index";
import fetch from "../../loaders/got";

const getAll = async (req: Request, res: Response) => {
  try {
    let bookResponse = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: `select * from dev.books order by __createdtime__ desc limit 4`,
      }),
    });
    let books = JSON.parse(bookResponse.body);
    console.log(books);
    return res.json({
      data: books,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let bookResponse = await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: `select * from dev.books where book_id = '${id}'`,
      }),
    });

    if (JSON.parse(bookResponse.body).length > 0) {
      let bookThreadResponse = await fetch.post(config.harperdbURL, {
        body: JSON.stringify({
          operation: "sql",
          sql: `select * from dev.threads join dev.books_threads where threads.thread_id = books_threads.thread_id and books_threads.book_id='${id}' order by threads.__createdtime__ desc`,
        }),
      });
      return res.json({
        bookInfo: JSON.parse(bookResponse.body),
        bookThreadInfo: JSON.parse(bookThreadResponse.body),
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "books_id not found" });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export { getAll, getOne };
