import { Request, Response, NextFunction } from "express";
import passport from "passport";

const handleAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log(`err => ${err}`);
    console.log(`user => ${JSON.stringify(user)}`);
    console.log(`info => ${info}`);
    req.user = user;
    if (!user) {
      return res.status(401).json("unauth");
    }
    next();
  })(req, res, next);
};

export default handleAuth;
