import { Auth0Provider } from "@auth0/auth0-react";

export function Auth0Config({ children }) {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
}
