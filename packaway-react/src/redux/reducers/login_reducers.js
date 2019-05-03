const defaultState = {
  status: false
};

export const loginStatusReducer = (state = defaultState, action) => {
  if (action.type === 'USER_LOGIN') {
    console.log('reducer', state);

    return Object.assign({}, state, { status: action.status });
  }
  return state;
};
