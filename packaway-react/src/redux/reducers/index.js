import { combineReducers } from 'redux';
// import { categoryFilterReducer } from './filterReducers';
import { userReducer } from './userReducers'
import { poiReducer } from './poiReducers'
import { packReducer } from './packReducers'
import { dayReducer } from './dayReducers'


export default combineReducers({
  // categoryFilterReducer,
  userReducer,
  poiReducer,
  packReducer,
  dayReducer
})