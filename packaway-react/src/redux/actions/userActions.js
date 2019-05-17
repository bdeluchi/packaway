export const setUserInfo = (user) => {
  return {
    payload: user,
    type: 'SET_USER_INFO'
  }
}

export const addPackToUser = (packId) => {
  //TODO: no la estoy usando
  return {
    packId: packId,
    type: 'ADD_PACK_TO_USER'
  }
}