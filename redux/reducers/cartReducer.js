let defaultState = {
  selectedItems: {
    items: [],
    restaurantName: "",
    total: 0,
    restaurantPhoto: "",
  },
};

const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
          restaurantPhoto: action.payload.restaurantPhoto,
        };
      } else {
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
        };
      }
      return newState;
    }
    case "CLEAR_ALL": {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
