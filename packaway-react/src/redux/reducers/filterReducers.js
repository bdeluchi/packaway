const defaultState = {
  selectedOption: null
};

export const categoryFilterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_FILTER":
      return {
        ...state,
        selectedOption: action.filter
      }

    default:
      return state;
  }
};
