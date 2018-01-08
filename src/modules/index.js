import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users'
import cities from './cities'

export default combineReducers({
  router: routerReducer,
  users,
  cities,
})
