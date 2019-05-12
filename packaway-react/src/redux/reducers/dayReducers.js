const defaultState = {
  numberOfDays: 0,
  days: []
};

export const dayReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case "UPDATE_NUMBER_OF_DAYS": {
      return {
        ...state,
        numberOfDays: action.numberOfDays
      }
    }

    case "ADD_DAYS": {
      return {
        ...state, days: action.days
      }
    }
    default: {
      return state;
    }
  }
};
