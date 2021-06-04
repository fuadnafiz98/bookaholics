import express, { request } from "express";
import { celebrate, Joi } from "celebrate";
// import { signIn, signOut, signUp, checkToken } from "./auth.controller";
import { signUp } from "./auth.controller";
import fetch from "../../loaders/got";

const router = express.Router();

router.post(
  "/signup",
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const data = await fetch.post(
        "https://hashnode-fuadnafiz98.harperdbcloud.com",
        {
          body: JSON.stringify({
            operation: "sql",
            sql: "select * from dev.bytes",
          }),
        }
      );
      console.log(data.body);
      return res.json(JSON.parse(data.body));

      // const data = await signUp(req.body);
      // res.cookie("JWTToken", data.token, {
      //   httpOnly: true,
      //   secure: true,
      // });
      // res.cookie("refreshToken", data.refreshToken, {
      //   httpOnly: true,
      //   secure: true,
      // });
      // return res.json({
      //   data: {
      //     token: data.token,
      //     userInfo: {
      //       name: data.username,
      //       userId: data.userId,
      //       role: data.role,
      //     },
      //   },
      // });
    } catch (err) {
      // throw new Error(
      //   `================== error at /signup ================\n
      //     ${err.message}`
      // );
      return next(err.message);
    }
  }
);
/*
router.post(
  "/signin",
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const data = await signIn(req.body);
      console.log(data);

      res.cookie("JWTToken", data.token, {
        httpOnly: true,
        secure: true,
      });

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
      });

      return res.json({
        data: {
          token: data.token,
          userInfo: {
            name: data.name,
            userId: data._id,
            role: data.role,
          },
        },
      });
    } catch (err) {
      // throw new Error(
      //   `================== error at /signin ================\n
      //     ${err.message}`
      // );
      return next(err.message);
    }
  }
);

router.post("/signout", async (req, res, next) => {
  try {
    await signOut(req.body);
  } catch (err) {
    return next(err.message);
  }
  if (req.cookies.JWTToken) {
    res.clearCookie("JWTToken", {
      httpOnly: true,
    });
  }
  if (req.cookies.refreshToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });
  }
  return res.json({
    data: "user logged out successfully",
  });
});

router.get("/token", async (req, res, next) => {
  console.log("/token");
  const data = await checkToken(req.cookies);
  console.log("/token", data);
  if (data === null) {
    console.log("returning");
    return res.status(401).json({ data: "unauth token" });
  }
  res.cookie("JWTToken", data.token, {
    httpOnly: true,
    secure: true,
  });
  return res.json({
    data: {
      token: data.token,
      userInfo: {
        name: data.name,
        userId: data._id,
        role: data.role,
      },
    },
  });
});
*/
export default router;
