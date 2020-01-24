import { UserGist } from "../../types";

type State = { userGist: UserGist[]; userToken?: string };

const initialState: any = {
  userProfile: [],
  userToken: null || localStorage.getItem("GitNotesUser"),
  userGists: [],
  editGist: false,
  loading: false,
  error: null,
  starStatus: [],
  unStarStatus: [],
  forkStatus: [],
  createGistStatus: [],
  starredGists: []
};

const userGist = (
  state: any = initialState,
  action: { payload: any; type: string }
): any => {
  const { payload, type } = action;
  switch (type) {
    case "GET_USER_PROFILE_REQUEST":
      return { ...state, loading: true };
    case "GET_USER_PROFILE_RESPONSE":
      return { ...state, loading: false, userProfile: payload };
    case "GET_USER_PROFILE_ERROR":
      return { ...state, loading: false, error: payload };

    case "GET_USER_GISTS_REQUEST":
      return { ...state, loading: true };
    case "GET_USER_GISTS_RESPONSE":
      return { ...state, loading: false, userGists: payload };
    case "GET_USER_GISTS_ERROR":
      return { ...state, loading: false, error: payload };

    case "STAR_GIST_REQUEST":
      return { ...state, loading: true };
    case "STAR_GIST_RESPONSE":
      return { ...state, loading: false, starStatus: payload };
    case "STAR_GIST_ERROR":
      return { ...state, loading: false, error: payload };

    case "UNSTAR_GIST_REQUEST":
      return { ...state, loading: true };
    case "UNSTAR_GIST_RESPONSE":
      return { ...state, loading: false, unStarStatus: payload };
    case "UNSTAR_GIST_ERROR":
      return { ...state, loading: false, error: payload };

    case "FORK_GIST_REQUEST":
      return { ...state, loading: true };
    case "FORK_GIST_RESPONSE":
      return { ...state, loading: false, forkStatus: payload };
    case "FORK_GIST_ERROR":
      return { ...state, loading: false, error: payload };

    case "CREATE_GIST_REQUEST":
      return { ...state, loading: true };
    case "CREATE_GIST_RESPONSE":
      return { ...state, loading: false, createGistStatus: payload };
    case "CREATE_GIST_ERROR":
      return { ...state, loading: false, error: payload };

    case "STARRED_GISTS_REQUEST":
      return { ...state, loading: true };
    case "STARRED_GISTS_RESPONSE":
      return { ...state, loading: false, starredGists: payload };
    case "STARRED_GISTS_ERROR":
      return { ...state, loading: false, error: payload };

    case "UPDATE_USER":
      return { ...state, userToken: payload };
    case "EDIT_GIST":
      return { ...state, editGist: payload };
    default:
      return state;
  }
};

export default userGist;
