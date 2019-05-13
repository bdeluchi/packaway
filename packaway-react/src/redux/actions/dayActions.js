
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

export const addDays = (days) => {
  return {
    days: days,
    type: 'ADD_DAYS'
  }
}

export const removePoi = (poiId) => {
  return {
    poiId: poiId,
    type: 'REMOVE_POI'
  }
}



export const addPoiToDay = (dayId, poi) => {
  return {
    dayId: dayId,
    poi: poi,
    type: 'ADD_POI_TO_DAY'
  }


}