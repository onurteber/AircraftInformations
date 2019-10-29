import { combineReducers } from "redux";
import { behaviorReducer } from "./behaviorReducer";

export default combineReducers({
  posts: behaviorReducer
});
