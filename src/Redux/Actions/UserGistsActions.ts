import { fetchAction } from "../../utils";

export const getUserProfile = (token: any) => {
  return fetchAction({
    type: "GET_USER_PROFILE",
    endpoint: `http://localhost:5000/user-gist/${token}`,
    verb: "GET"
  });
};

export const getUserGists = gistsUrl => {
  return fetchAction({
    type: "GET_USER_GISTS",
    endpoint: `${gistsUrl}`,
    verb: "GET"
  });
};

export const starTheGist = (gistId, token) => {
  return fetchAction({
    type: "STAR_GIST",
    endpoint: `http://localhost:5000/star-a-gist/${gistId}/${token}`,
    verb: "PUT"
  });
};

export const unStarTheGist = (gistId, token) => {
  return fetchAction({
    type: "UNSTAR_GIST",
    endpoint: `http://localhost:5000/unstar-a-gist/${gistId}/${token}`,
    verb: "DELETE"
  });
};

export const forkTheGist = (gistId, token) => {
  return fetchAction({
    type: "FORK_GIST",
    endpoint: `http://localhost:5000/fork-a-gist/${gistId}/${token}`,
    verb: "POST"
  });
};

export const createTheGist = (files, description, token) => {
  return fetchAction({
    type: "CREATE_GIST",
    endpoint: "https://api.github.com/gists",
    verb: "POST",
    headers: { Authorization: `Bearer ${token}` },
    payload: JSON.stringify({
      description: `${description}`,
      public: true,
      files
    })
  });
};

export const getStarredGists = token => {
  return fetchAction({
    type: "STARRED_GISTS",
    endpoint: `http://localhost:5000/starred-gists/${token}`,
    verb: "GET"
  });
};

export const editGist = value => {
  return (dispatch: any) => {
    dispatch({ type: "EDIT_GIST", payload: value });
  };
};

export const getContent = url => {
  return fetchAction({
    type: "GET_CONTENT",
    endpoint: `${url}`,
    verb: "GET"
  });
};
