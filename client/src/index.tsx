import ReactDOM from "react-dom/client";
import { Application } from "./application";
import { Auth0Config } from "../auth0.config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Config>
    <Application />
  </Auth0Config>
);
