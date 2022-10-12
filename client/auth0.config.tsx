import { Auth0Provider } from "@auth0/auth0-react";
import * as React from "react";

export function Auth0Config({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const domain = "https://magnushodne.eu.auth0.com/";
  const clientId = "JN8jmWPtBrI52sVNAAP5ZHntM4VKAc3L";
  let redirectUri = "https://dndnotes.trovik.dev/callback";
  let audience = "https://api.trovik.dev";

  if (process.env.NODE_ENV === "development") {
    redirectUri = "http://localhost:3000/callback";
    audience = "http://localhost:5000";
  }

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      {children}
    </Auth0Provider>
  );
}
