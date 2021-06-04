import jwt from "jsonwebtoken";

import { Payload } from "../types";

function generateToken(payload: Payload, isRefreshToken: boolean) {
  // const today = new Date();
  // const exp = new Date(today);
  // exp.setDate(today.getDate() + 30);

  console.log(`generating token for user: ${payload._id}`);
  return jwt.sign(
    {
      _id: payload._id,
      role: payload.role,
      name: payload.name,
      // exp: exp.getTime() / 1000,
    },
    isRefreshToken ? "nowwhat" : "passwordless",
    {
      expiresIn: isRefreshToken ? "90d" : "60s",
    }
  );
}

function validateToken(token: string, isRefreshToken: boolean) {
  try {
    const result = jwt.verify(
      token,
      isRefreshToken ? "nowwhat" : "passwordless"
    );
    console.log("jwt.ts", result);
    return result;
  } catch (err) {
    return null;
  }
}

export { generateToken, validateToken };
