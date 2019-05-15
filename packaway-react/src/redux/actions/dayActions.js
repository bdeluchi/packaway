
export const updateNumberOfDays = (days) => {
  return {
    numberOfDays: days,
    type: 'UPDATE_NUMBER_OF_DAYS'
  }
}

export const addUnassignedPois = (poi) => {
  return {
    unassignedPois: poi,
    type: 'ADD_UNASSIGNED_POIS'
  }
}

export const returnPoiToUnassigned = (poi) => {
  return {
    poi: poi,
    type: 'RETURN_TO_UNASSIGNED'
  }
}

export const addDays = (days) => {
  return {
    days: days,
    type: 'ADD_DAYS'
  }
}

export const removePoiFromDay = (poi, dayId) => {
  return {
    dayId: dayId,
    poi: poi,
    type: 'REMOVE_POI_FROM_DAY'
  }
}

export const removePoi = (poiId) => {
  return {
    poiId: poiId,
    type: 'REMOVE_POI'
  }
}

export const removeLastDay = (days) => {
  return {
    days: days,
    type: 'REMOVE_DAY'
  }
}

export const resetDayStatus = () => {
  return {
    type: 'RESET_DAYS'
  }
}



export const addPoiToDay = (dayId, poi) => {
  return {
    dayId: dayId,
    poi: poi,
    type: 'ADD_POI_TO_DAY'
  }


}