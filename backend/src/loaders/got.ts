import got from "got";

import config from "../config/index";

const fetch = got.extend({
  headers: {
    Authorization: `Basic ${Buffer.from(
      config.username + ":" + config.password
    ).toString("base64")}`,
    "Content-Type": "application/json",
  },
});

export default fetch;
