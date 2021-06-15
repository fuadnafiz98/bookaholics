import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { getOne } from "./books.controller";

const router = Router();

router.get("/", async (req, res) => {
  return res.json({ status: 200 });
});

router.get("/:id", getOne);

export default router;
