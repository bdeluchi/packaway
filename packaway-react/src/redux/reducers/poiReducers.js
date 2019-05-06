const defaultState = {
  pois: {}
};

export const poiReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "ADD_POI": {
      return {
        pois: { ...state.pois, [action.id]: action.payload }
      };
    }
    case "REMOVE_POI": {
      return {
        pois: Object.keys(state.pois)
          .filter(poiId => poiId !== action.id)
          .reduce((obj, key) => {
            obj[key] = state.pois[key];
            return obj;
          }, {})
      };
    }
    default: {
      return state;
    }
  }
};
