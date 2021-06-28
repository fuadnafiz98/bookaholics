import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import threadController from "./threads.controller";

const router = Router();

router.get("/", threadController.getAll);

router.post(
  "/like",
  celebrate({
    body: Joi.object({
      user_id: Joi.string().required(),
      thread_id: Joi.string().required(),
    }),
  }),
  threadController.updateLike
);

router.post(
  "/new",
  celebrate({
    body: Joi.object({
      user_id: Joi.string().required(),
      parent: Joi.string().allow(null),
      book_id: Joi.string().allow(null),
      parent_id: Joi.string().allow(null),
      topic_name: Joi.string().required(),
      topic_body: Joi.string().allow(null),
      comment_count: Joi.number(),
      date: Joi.string(),
      upvote: Joi.number(),
      downvote: Joi.number(),
      view_count: Joi.number().required(),
    }),
  }),
  threadController.addOne
);

router.get("/:id", threadController.getOne);
router.post(
  "/:id",
  celebrate({
    body: Joi.object({
      topic_name: Joi.string().allow(null),
      topic_body: Joi.string().allow(null),
    }),
  }),
  threadController.updateOne
);

router.post("/delete/:id", threadController.deleteOne);

export default router;
