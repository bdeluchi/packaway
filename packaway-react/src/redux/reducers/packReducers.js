const defaultState = {
  currentPack: null,
  location: null
};

export const packReducer = (state = defaultState, action) => {

  switch (action.type) {
    case "SET_PACK": {
      return {
        ...state,
        currentPack: action.id
      };
    }

    case "RESET_PACK": {
      return {
        ...state,
        currentPack: defaultState.currentPack
      }
    }

    case "SET_LOCATION": {
      return {
        ...state,
        location: action.location
      }
    }
    
    default: {
      return state;
    }
  }
};
