const defaultState = {
  status: false
};

export const loginStatusReducer = (state = defaultState, action) => {
  if (action.type === 'USER_LOGIN') {
    return Object.assign({}, state, { status: action.status });
  }
  return state;
};
