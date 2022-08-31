import { Router } from "express";
import { User } from "./model/User.js";

/**
 *
 * @param fetchFunc - a function that can fetch data from the internet (probably node-fetch)
 */
async function googleConfig({ fetchFunc }) {
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const { userinfo_endpoint, authorization_endpoint } = await fetchFunc(
    discovery_endpoint
  );
  return {
    authorization_endpoint,
    userinfo_endpoint,
    scope: "profile email",
    client_id: process.env.GOOGLE_CLIENT_ID,
    response_type: "token",
  };
}

async function azureConfig({ fetchFunc }) {
  const discovery_endpoint =
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration";
  const { userinfo_endpoint, authorization_endpoint, token_endpoint } =
    await fetchFunc(discovery_endpoint);

  return {
    authorization_endpoint,
    userinfo_endpoint,
    token_endpoint,
    scope: "openid",
    client_id: process.env.AZURE_CLIENT_ID,
    response_type: "code",
    code_challenge_method: "S256",
  };
}

/**
 *
 * @param access_token
 * @param config - what configuration to get the userinfo_endpoint from (i.e. Google, GitHub or AD)
 * @param fetchFunc - a function that can fetch data from the internet (probably node-fetch)
 */
async function fetchUser({ access_token, config, fetchFunc }) {
  try {
    return await fetchFunc(config.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (e) {
    console.log(`Failed to fetch user info: ${e}`);
    return undefined;
  }
}

export function LoginController({ fetchFunc }) {
  const router = new Router();

  //Endpoint for logging in
  router.post("/:provider", async (req, res) => {
    const { provider } = req.params;
    const { access_token } = req.body;
    let user;

    if (provider === "google") {
      user = await fetchUser({
        access_token,
        config: await googleConfig({ fetchFunc }),
        fetchFunc,
      });
    } else if (provider === "azure") {
      user = await fetchUser({
        access_token,
        config: await azureConfig({ fetchFunc }),
        fetchFunc,
      });
    }
    if (!(await User.exists({ sub: user.sub }))) {
      await new User({ sub: user.sub, name: user.name }).save();
    }

    res.cookie(`${provider}_access_token`, access_token, { signed: true });
    res.sendStatus(200);
  });

  //Endpoint for getting user info
  router.get("/", async (req, res) => {
    const config = {
      google: await googleConfig({ fetchFunc }),
      azure: await azureConfig({ fetchFunc }),
    };

    const response = { config, user: {} };

    //Attempt to get the tokens from the signed cookies
    const { google_access_token, azure_access_token } = req.signedCookies;

    //If we have a Google token, fetch the data from Google and add it to the user object
    if (google_access_token) {
      response.user = await fetchUser({
        access_token: google_access_token,
        config: config.google,
        fetchFunc,
      });
    }

    //If we have an Azure token, fetch the data from Google and add it to the user object
    if (azure_access_token) {
      response.user = await fetchUser({
        access_token: azure_access_token,
        config: config.azure,
        fetchFunc,
      });
    }
    res.json(response);
  });

  //Endpoint for logging out
  router.delete("/", (req, res) => {
    res.clearCookie("google_access_token");
    res.clearCookie("github_access_token");
    res.clearCookie("azure_access_token");
    res.sendStatus(200);
  });

  return router;
}
