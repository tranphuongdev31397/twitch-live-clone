import { API_ROUTES } from "./api";
import { BROWSE_ROUTES } from "./browse";
import { DASHBOARD_ROUTES } from "./dashboard";

export const PUBLIC_ROUTES = {
  ...API_ROUTES.PUBLIC,
  ...BROWSE_ROUTES.PUBLIC,
  ...DASHBOARD_ROUTES.PUBLIC,
};
