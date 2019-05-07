const defaultState = {
  churchesFilter: false,
  museumsFilter: false,
  parksFilter: false
};

export const categoryFilterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CHURCH_FILTER":
      return Object.assign({}, state, { churchesFilter: true, museumsFilter: state.museumsFilter, parksFilter: state.parksFilter });
    case "REMOVE_CHURCH_FILTER":
      return Object.assign({}, state, { churchesFilter: false, museumsFilter: state.museumsFilter, parksFilter: state.parksFilter });
    case "ADD_MUSEUM_FILTER":
      return Object.assign({}, state, { churchesFilter: state.churchesFilter, museumsFilter: true, parksFilter: state.parksFilter });
    case "REMOVE_MUSEUM_FILTER":
      return Object.assign({}, state, { churchesFilter: state.churchesFilter, museumsFilter: false, parksFilter: state.parksFilter });
    case "ADD_PARK_FILTER":
      return Object.assign({}, state, { churchesFilter: state.churchesFilter, museumsFilter: state.museumsFilter, parksFilter: true });
    case "REMOVE_PARK_FILTER":
      return Object.assign({}, state, { churchesFilter: state.churchesFilter, museumsFilter: state.museumsFilter, parksFilter: false });
    default:
      return state;
  }
};
