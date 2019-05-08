const defaultState = {
  currentPack: null
};

export const packReducer = (state = defaultState, action) => {

  if (action.type === "SET_PACK") {
    return {
      ...state,
      currentPack: action.id
    };
  }

  return state;
};
