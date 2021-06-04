import { Request } from "express";
import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { StrategyOptions } from "passport-jwt";

/* ================ JWT TOKEN =================== */

const getTokenFromCookie = (request: Request) => {
  let token = null;
  if (request && request.cookies) token = request.cookies["JWTToken"];
  console.log("auth/passport.js => ", token);
  return token;
};

const config: StrategyOptions = {
  // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: getTokenFromCookie,
  // TODO: use `dotenv`
  secretOrKey: "passwordless",
};

let ok = true;

passport.use(
  new JWTStrategy(config, function (payload, done) {
    console.log("payload => ", payload);
    // TODO: search in database??
    if (ok) {
      return done(null, payload);
    } else {
      return done(false);
    }
  })
);

export default passport;
