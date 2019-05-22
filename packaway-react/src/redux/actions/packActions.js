export const setCurrentPack = (packId) => {
  return {
    id: packId,
    type: 'SET_PACK'
  }
}

export const resetCurrentPack = () => {
  return {
    type: 'RESET_PACK'
  }
}

export const setCurrentPackOrigin = (location) => {
  return {
    location: location,
    type: 'SET_LOCATION'
  }
}