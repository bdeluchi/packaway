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
    
    default: {
      return state;
    }
  }
};
