import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

const reducers = combineReducers({
  cartReducer,
});

const rootReducer = (state, actions) => {
  return reducers(state, actions);
};

export default rootReducer;
