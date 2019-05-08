import { combineReducers } from 'redux';
import { categoryFilterReducer } from './filterReducers';
import { userReducer } from './userReducers'
import { poiReducer } from './poiReducers'
import { packReducer } from './packReducers'

export default combineReducers({
  categoryFilterReducer,
  userReducer,
  poiReducer,
  packReducer
})