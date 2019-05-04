import { combineReducers } from 'redux';
import { categoryFilterReducer } from './filterReducers';
import { userReducer } from './userReducers'

export default combineReducers({
  categoryFilterReducer,
  userReducer
})