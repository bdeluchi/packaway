const defaultState = {
  numberOfDays: 0,
  unassignedPois: {},
  days: []
};

export const dayReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_NUMBER_OF_DAYS": {
      return {
        ...state,
        numberOfDays: action.numberOfDays
      };
    }

    case "ADD_UNASSIGNED_POIS": {
      return {
        ...state,
        unassignedPois: {
          ...state.unassignedPois,
          [action.unassignedPois.id]: action.unassignedPois
        }
      };
    }

    case "RETURN_TO_UNASSIGNED": {
      return {
        ...state,
        unassignedPois: { ...state.unassignedPois, [action.poi.id]: action.poi }
      };
    }
    case "ADD_DAYS": {
      return {
        ...state,
        days: [...state.days, action.days]
      };
    }

    case "REMOVE_DAY": {
      return {
        ...state,
        days: [...action.days.slice(0, -1)]
      };
    }

    case "ADD_POI_TO_DAY": {
      const stateWithoutUnassignedPoi = {
        ...state,
        unassignedPois: Object.keys(state.unassignedPois)
          .filter(poiId => poiId !== action.poi.id)
          .reduce((obj, key) => {
            obj[key] = state.unassignedPois[key];
            return obj;
          }, {})
      };

      const stateWithoutDayPoi = {
        ...stateWithoutUnassignedPoi,
        days: stateWithoutUnassignedPoi.days.map(function(day) {
          return {
            ...day,
            pois: Object.keys(day.pois)
              .filter(poiId => poiId !== action.poi.id)
              .reduce((obj, key) => {
                obj[key] = day.pois[key];
                return obj;
              }, {})
          };
        })
      };

      return {
        ...stateWithoutDayPoi,
        days: stateWithoutDayPoi.days.map(day =>
          day.dayId === action.dayId
            ? { ...day, pois: { ...day.pois, [action.poi.id]: action.poi } }
            : day
        )
      };
    }

    case "REMOVE_POI_FROM_DAY": {
      return {...state,
        days: state.days.map(function(day) {
          return {
            ...day,
            pois: Object.keys(day.pois)
              .filter(poiId => poiId !== action.poi.id)
              .reduce((obj, key) => {
                obj[key] = day.pois[key];
                return obj;
              }, {})
          }
        })

      }
    }
    case "REMOVE_POI": {
      const stateWithoutRemovedPoi = {
        ...state,
        unassignedPois: Object.keys(state.unassignedPois)
          .filter(poiId => poiId !== action.poiId)
          .reduce((obj, key) => {
            obj[key] = state.unassignedPois[key];
            return obj;
          }, {})
      };

      const stateWithoutDayPoi = {
        ...stateWithoutRemovedPoi,
        days: stateWithoutRemovedPoi.days.map(function(day) {
          return {
            ...day,
            pois: Object.keys(day.pois)
              .filter(poiId => poiId !== action.poiId)
              .reduce((obj, key) => {
                obj[key] = day.pois[key];
                return obj;
              }, {})
          };
        })
      };

      return stateWithoutDayPoi;
    }
    case "RESET_UNASSIGNED": {
      return {
        ...state,
        unassignedPois: defaultState.unassignedPois 
      }
    }
    case "RESET_DAYS": {
      return {
        ...state,
        days: defaultState.days,
        numberOfDays: defaultState.numberOfDays
      };
    }

    default: {
      return state;
    }
  }
};
