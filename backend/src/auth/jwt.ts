import config from "../config/index";
import jwt from "jsonwebtoken";

import { Payload } from "../types";

function generateToken(payload: Payload, isRefreshToken: boolean) {
  // const today = new Date();
  // const exp = new Date(today);
  // exp.setDate(today.getDate() + 30);

  console.log(`generating token for user: ${payload.user_id}`);
  return jwt.sign(
    {
      name: payload.name,
      // exp: exp.getTime() / 1000,
    },
    isRefreshToken ? config.refreshToken : config.jwtToken,
    {
      expiresIn: isRefreshToken ? "90d" : "60s",
    }
  );
}

function validateToken(token: string, isRefreshToken: boolean) {
  try {
    const result = jwt.verify(
      token,
      isRefreshToken ? config.refreshToken : config.jwtToken
    );
    console.log("jwt.ts", result);
    return result;
  } catch (err) {
    return null;
  }
}

export { generateToken, validateToken };
