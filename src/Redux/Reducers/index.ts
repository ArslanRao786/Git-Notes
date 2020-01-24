import { combineReducers } from "redux";
import PublicGists from "./publicGists";
import UserGist from "./userGist";

const allReducers = combineReducers({
  PublicGists: PublicGists,
  UserGist: UserGist
});

export default allReducers;
