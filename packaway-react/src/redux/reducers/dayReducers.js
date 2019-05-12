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
        unassignedPois: action.unassignedPois
      };
    }

    case "ADD_DAYS": {
      return {
        ...state,
        days: [...state.days, action.days]
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
          days: 
            stateWithoutUnassignedPoi.days.map(function(day) {
              return {...day, pois: Object.keys(day.pois)
                .filter(poiId => poiId !== action.poi.id)
                .reduce((obj, key) =>{
                  obj[key] = day.pois[key];
                  return obj
                }, {})}
            })
        }

      return {
        ...stateWithoutDayPoi,
        days: stateWithoutDayPoi.days.map(day =>
          day.dayId === action.dayId
            ? { ...day, pois: { ...day.pois, [action.poi.id]: action.poi } }
            : day
        )
      };
    }
    default: {
      return state;
    }
  }
};
