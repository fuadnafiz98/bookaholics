import express, { Request, Response } from "express";

import auth from "./auth/auth.route";
import books from "./books/books.routes";
import bytes from "./bytes/bytes.routes";
import threads from "./threads/threads.routes";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.json({
    message: "well, wellcome to the backed api",
  });
});

router.use("/auth", auth);
router.use("/books", books);
router.use("/bytes", bytes);
router.use("/threads", threads);

export default router;
