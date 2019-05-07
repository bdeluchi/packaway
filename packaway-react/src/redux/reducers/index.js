import { combineReducers } from 'redux';
import { categoryFilterReducer } from './filterReducers';
import { userReducer } from './userReducers'
import { poiReducer } from './poiReducers'

export default combineReducers({
  categoryFilterReducer,
  userReducer,
  poiReducer
})