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


// export const removePack = (packId) => {
//   return {
//     id: packId,
//     type: 'DELETE_PACK'
//   }
// }