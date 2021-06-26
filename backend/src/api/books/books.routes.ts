import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { getAll, getOne } from "./books.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);

export default router;
