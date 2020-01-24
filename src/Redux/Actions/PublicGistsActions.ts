import { fetchAction } from "../../utils";

export const getPublicGists = () => {
  return fetchAction({
    type: "GET_PUBLIC_GISTS",
    endpoint: `http://localhost:5000/public-gists`,
    verb: "GET"
  });
};

export const getGist = gistId => {
  return fetchAction({
    type: "GET_GIST_DATA",
    endpoint: `http://localhost:5000/single-gist/${gistId}`,
    verb: "GET"
  });
};
