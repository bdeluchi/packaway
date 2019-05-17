const defaultState = {
  user: null
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_INFO": {
      //TODO: no debería devolver todo el usuario
      return {
        ...state,
        user: action.payload
      };
    }

    case "ADD_PACK_TO_USER": {

      return {
        ...state.user,
        packs: [...state.user.packs, action.packId]
      };
    }

    default: {
      return state;
    }
  }
};