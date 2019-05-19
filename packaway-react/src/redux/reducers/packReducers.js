const defaultState = {
  currentPack: null
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
    
    default: {
      return state;
    }
  }
};
