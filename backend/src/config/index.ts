import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const hasEnv = dotenv.config();

if (!hasEnv) {
  throw new Error("🔔 .env file not found");
}

export default {
  username: String(process.env.NAME),
  password: String(process.env.PASSWORD),
  harperdbURL: String(process.env.HARPERDB_URL),
  refreshToken: String(process.env.REFRESH_TOKEN_SECRET),
  jwtToken: String(process.env.JWT_TOKEN_SECRET),
};
