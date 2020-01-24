type State = {
  publicGists?: any;
  gistData?: any;
  error?: any;
  loading?: any;
};

const initialState: State = {
  publicGists: [],
  gistData: [],
  error: null,
  loading: false
};

const publicGists = (
  state: State = initialState,
  action: { payload: any; type: string }
): State => {
  const { payload, type } = action;
  switch (type) {
    case "GET_PUBLIC_GISTS_REQUEST":
      return { ...state, loading: true };
    case "GET_PUBLIC_GISTS_RESPONSE":
      return { ...state, loading: false, publicGists: payload };
    case "GET_PUBLIC_GISTS_ERROR":
      return { ...state, loading: false, error: payload };

    case "GET_GIST_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_GIST_DATA_RESPONSE":
      return { ...state, loading: false, gistData: [payload] };
    case "GET_GIST_DATA_ERROR":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default publicGists;
