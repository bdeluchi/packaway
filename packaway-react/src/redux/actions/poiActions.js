export const addPoi = (poi) => {
  return {
    payload: poi,
    id: poi.id,
    type: 'ADD_POI'
  }
}

export const removePoi = (id) => {
  return {
    id: id,
    type: 'REMOVE_POI'
  }
}