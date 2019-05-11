export const setCurrentPack = (packId) => {
  return {
    id: packId,
    type: 'SET_PACK'
  }
}

export const updateNumberOfDays = (days) => {
  return {
    numberOfDays: days,
    type: 'UPDATE_DAYS'
  }
}

// export const removeCurrentPack = (packId) => {
//   return {
//     id: packId,
//     type: 'REMOVE_PACK'
//   }
// }