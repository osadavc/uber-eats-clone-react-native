import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import bottomNavReducer from "./bottomNavReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  cartReducer,
  bottomNavReducer,
  authReducer,
});

const rootReducer = (state, actions) => {
  return reducers(state, actions);
};

export default rootReducer;
