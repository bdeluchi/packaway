const defaultState = {
  currentPack: null,
  days: 1
};

export const packReducer = (state = defaultState, action) => {

  switch (action.type) {
    case "SET_PACK": {
      return {
        ...state,
        currentPack: action.id
      };
    }
    
    case "UPDATE_DAYS": {
      return {
        ...state,
        days: action.numberOfDays
      }
    }
    default: {
      return state;
    }
  }
};
