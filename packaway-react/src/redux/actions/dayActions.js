
export const updateNumberOfDays = (days) => {
  return {
    numberOfDays: days,
    type: 'UPDATE_NUMBER_OF_DAYS'
  }
}


export const addDays = (days) => {
  return {
    days: days,
    type: 'ADD_DAYS'
  }
}