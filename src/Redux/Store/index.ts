import { createStore, applyMiddleware } from "redux";
import allReducers from "../Reducers";
import { fetchMiddleware } from "../middleware/fetchMiddleware";

const store = createStore(allReducers, applyMiddleware(fetchMiddleware));

export default store;
