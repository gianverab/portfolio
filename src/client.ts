import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
  //token: import.meta.env.VITE_REACT_APP_SANITY_TOKEN,
});
