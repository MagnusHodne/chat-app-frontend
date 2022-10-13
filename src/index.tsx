import ReactDOM from "react-dom/client";
import { Application } from "./application";
import { Auth0ProviderWithRedirect } from "./components/auth0ProviderWithRedirect";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Auth0ProviderWithRedirect>
      <Application />
    </Auth0ProviderWithRedirect>
  </Router>
);
