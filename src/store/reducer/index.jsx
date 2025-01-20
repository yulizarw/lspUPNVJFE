import { combineReducers } from "redux";
import { userReducers } from "./userReducer";
import {adminReducers} from "./adminReducer";
import { asesorReducers } from "./asesorReducer";
export default combineReducers({
  userReducers,
  adminReducers,
  asesorReducers
});
