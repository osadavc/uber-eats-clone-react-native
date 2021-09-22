const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOG_IN_USER": {
      return action.payload;
    }
    case "LOG_OUT_USER":
      return {};

    default: {
      return state;
    }
  }
};

export default authReducer;
