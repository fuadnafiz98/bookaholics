import { randomBytes } from "crypto";
import argon2 from "argon2";
import { generateToken, validateToken } from "../../auth/jwt";

async function signUp({
  name,
  password,
  role,
}: {
  name: string;
  password: string;
  role: string;
}) {
  /*
  const fetcheduser = await Users.query().findOne({ name: name });
  if (fetcheduser) {
    throw new Error("user already created");
  }
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });

  const user = await Users.query().insert({
    name: name,
    password: hashedPassword,
    role: role,
    refreshToken: refreshToken,
  });

  const token = generateToken(
    {
      _id: user.id,
      name: user.name,
      role: user.role,
    },
    false
  );

  const refreshToken = generateToken(
    {
      _id: user.id,
      name: user.name,
      role: user.role,
    },
    true
  );

  const updatedUser = await Users.query()
    .patch({ refreshToken: refreshToken })
    .where("name", "=", name);
  console.log("updated User", updatedUser);

  return {
    username: user.name,
    userId: user.id,
    role: user.role,
    token: token,
    refreshToken,
  };
  */
}

/*
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
  role: string;
  _id: string;
}> {
  const user = await Users.query().findOne({ name: name });
  if (!user) {
    throw new Error("user not found");
  }
  const validPassword = await argon2.verify(user.password, password);
  if (validPassword) {
    const token = generateToken(
      {
        name,
        password,
        _id: user.id,
        role: user.role,
      },
      false
    );
    const refreshToken = generateToken(
      {
        _id: user.id,
        name: user.name,
        role: user.role,
      },
      true
    );
    const updatedUser = await Users.query()
      .patch({ refreshToken: refreshToken })
      .where("name", "=", name);
    console.log("updated User", updatedUser);
    return {
      name,
      token,
      refreshToken,
      role: user.role,
      _id: user.id,
    };
  } else {
    throw new Error("invalid password");
  }
}

async function signOut({ userInfo }) {
  if (userInfo === null || userInfo.name === null) return;
  const updatedUser = await Users.query()
    .patch({ refreshToken: null })
    .where("name", "=", userInfo.name);
  console.log("updated User", updatedUser);
}

async function checkToken(
  cookies
): Promise<{
  name: string;
  token: string;
  refreshToken: string;
  role: string;
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
export { checkToken, signIn, signUp, signOut };
*/
export { signUp };
