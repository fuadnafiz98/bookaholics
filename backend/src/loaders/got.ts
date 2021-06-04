import got from "got";

const username = "fuadnafiz";
const password = "L@fcZ@2atP4Dhui";

const fetch = got.extend({
  headers: {
    Authorization: `Basic ${Buffer.from(username + ":" + password).toString(
      "base64"
    )}`,
    "Content-Type": "application/json",
  },
});

export default fetch;
