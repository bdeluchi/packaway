const defaultState = {
  pois: null
};

export const poiReducer = (state = defaultState, action = {}) => {
  console.log(state.pois)
  switch (action.type) {
    case "ADD_POI": {
      return {
        pois: { ...state.pois, [action.id]: action.payload }
      };
    }
    // case "REMOVE_POI": {

    // }
    default: {
      return state;
    }
  }
};
