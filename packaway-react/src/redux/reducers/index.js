import { combineReducers } from 'redux';
import { loginStatusReducer } from './login_reducers';

export default combineReducers({
  loginStatusReducer: loginStatusReducer
})