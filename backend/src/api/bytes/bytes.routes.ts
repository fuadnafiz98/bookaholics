import express from "express";
import { celebrate, Joi } from "celebrate";
import { insertQuote, increaseLove, fetchData } from "./bytes.controller";

const router = express.Router();

router.post(
  "/post",
  celebrate({
    body: Joi.object({
      user_id: Joi.string().required(),
      author: Joi.string(),
      book_name: Joi.string().allow(null),
      image_url: Joi.string().allow(null),
      love_count: Joi.number(),
      quote: Joi.string(),
    }),
  }),
  insertQuote
);

router.post(
  "/love",
  celebrate({
    body: Joi.object({
      user_id: Joi.string().required(),
      byte_id: Joi.string().required(),
    }),
  }),
  increaseLove
);

router.post("/fetch", fetchData);

export default router;
