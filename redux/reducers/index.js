import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import bottomNavReducer from "./bottomNavReducer";

const reducers = combineReducers({
  cartReducer,
  bottomNavReducer,
});

const rootReducer = (state, actions) => {
  return reducers(state, actions);
};

export default rootReducer;
