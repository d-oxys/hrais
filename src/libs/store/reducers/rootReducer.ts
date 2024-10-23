import { combineReducers } from "redux";
import authSlice from "../slices/auth.slice";
import employeeSlice from "../slices/employee.slice";
import roleSlice from "../slices/role.slice";

const rootReducer = combineReducers({
  authSlice,
  employeeSlice,
  roleSlice,
});

export default rootReducer;
