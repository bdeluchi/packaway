import { combineReducers } from 'redux';
import { loginStatusReducer } from './login_reducers';
import { categoryFilterReducer } from './filter_reducers';

export default combineReducers({
  loginStatusReducer: loginStatusReducer,
  categoryFilterReducer: categoryFilterReducer
})