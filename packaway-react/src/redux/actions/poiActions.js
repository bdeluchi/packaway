export const addPoi = (poi) => {
  return {
    payload: poi,
    id: poi.id,
    type: 'ADD_POI'
  }
}

// export const removePoi = (poi) => {
//   return {
//     id: poi.id,
//     type: 'REMOVE_POI'
//   }
// }