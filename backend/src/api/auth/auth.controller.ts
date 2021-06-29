import { randomBytes } from "crypto";
import argon2, { hash } from "argon2";
import { generateToken, validateToken } from "../../auth/jwt";
import fetch from "../../loaders/got";
import config from "../../config";

async function signUp({ name, password }: { name: string; password: string }) {
  let fetchedUser = await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "sql",
      sql: `select name from dev.users u where name='${name}'`,
    }),
  });
  fetchedUser = JSON.parse(fetchedUser.body);
  //@ts-ignore
  if (fetchedUser[0] != undefined) {
    throw new Error("user already created");
  }
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });

  const insertedUser = await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "insert",
      schema: "dev",
      table: "users",
      records: [
        {
          name: name,
          password: hashedPassword,
          refreshToken: null,
        },
      ],
    }),
  });

  fetchedUser = await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "sql",
      sql: `select * from dev.users u where name='${name}'`,
    }),
  });

  fetchedUser = JSON.parse(fetchedUser.body);
  //@ts-ignore
  let user = fetchedUser[0];
  const token = generateToken(
    {
      user_id: user.user_id,
      name: user.name,
    },
    false
  );
  const refreshToken = generateToken(
    {
      user_id: user.user_id,
      name: user.name,
    },
    true
  );

  await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "sql",
      sql: `UPDATE dev.users SET refreshToken = '${refreshToken}' WHERE name='${user.name}'`,
    }),
  });

  return {
    userId: user.user_id,
    username: user.name,
    token: token,
    refreshToken,
  };
}

async function signIn({
  name,
  password,
}: {
  name: string;
  password: string;
}): Promise<{
  name: string;
  token: string;
  refreshToken: string;
  _id: string;
}> {
  let fetchedUser = await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "sql",
      sql: `select * from dev.users where name='${name}'`,
    }),
  });
  fetchedUser = JSON.parse(fetchedUser.body);
  //@ts-ignore
  const user = fetchedUser[0];
  // console.log(user);
  if (user == undefined) {
    throw new Error("user not found");
  }
  const validPassword = await argon2.verify(user.password, password);
  if (validPassword) {
    const token = generateToken(
      {
        user_id: user.user_id,
        name: user.name,
      },
      false
    );
    const refreshToken = generateToken(
      {
        user_id: user.user_id,
        name: user.name,
      },
      true
    );

    await fetch.post(config.harperdbURL, {
      body: JSON.stringify({
        operation: "sql",
        sql: `UPDATE dev.users SET refreshToken = '${refreshToken}' WHERE name='${user.name}'`,
      }),
    });

    return {
      name,
      token,
      refreshToken,
      _id: user.user_id,
    };
  } else {
    throw new Error("invalid password");
  }
}

//@ts-ignore
async function signOut({ userInfo }) {
  console.log(userInfo);
  if (userInfo === null || userInfo.name === null) return;
  await fetch.post(config.harperdbURL, {
    body: JSON.stringify({
      operation: "sql",
      sql: `UPDATE dev.users SET refreshToken = null  WHERE user_id='${userInfo.userId}'`,
    }),
  });
}

/*
async function checkToken(
  cookies
): Promise<{
  name: string;
  token: string;
  refreshToken: string;
  _id: string;
} | null> {
  if (cookies === null) return null;
  const refreshToken = cookies["refreshToken"];
  if (refreshToken === null) return null;
  const user = validateToken(refreshToken, true);
  if (user === null) return null;
  console.time("db start");
  const result = await Users.query()
    .select("*")
    .where("refreshToken", "=", refreshToken);
  console.timeEnd("db start");
  if (result.length === 0) return null;
  const token = generateToken(
    {
      _id: result[0].id,
      name: result[0].name,
      role: result[0].role,
    },
    false
  );
  return {
    _id: result[0].id,
    token,
    role: result[0].role,
    name: result[0].name,
  };
}
*/
export { signIn, signUp, signOut };
