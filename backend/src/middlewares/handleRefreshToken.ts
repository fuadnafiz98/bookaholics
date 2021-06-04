import { Request, Response, NextFunction } from "express";
import log from "../utils/log";

const handleRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log(req.cookies);
  next();
};

export default handleRefreshToken;
