const defaultState = {
  church: false,
  museum: false,
  park: false
};

export const categoryFilterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CHURCH_FILTER":
      return Object.assign({}, state, {
        church: true,
        museum: state.museum,
        park: state.park
      });
    case "REMOVE_CHURCH_FILTER":
      return Object.assign({}, state, {
        church: false,
        museum: state.museum,
        park: state.park
      });
    case "ADD_MUSEUM_FILTER":
      return Object.assign({}, state, {
        church: state.church,
        museum: true,
        park: state.park
      });
    case "REMOVE_MUSEUM_FILTER":
      return Object.assign({}, state, {
        church: state.church,
        museum: false,
        park: state.park
      });
    case "ADD_PARK_FILTER":
      return Object.assign({}, state, {
        church: state.church,
        museum: state.museum,
        park: true
      });
    case "REMOVE_PARK_FILTER":
      return Object.assign({}, state, {
        church: state.church,
        museum: state.museum,
        park: false
      });
    default:
      return state;
  }
};
