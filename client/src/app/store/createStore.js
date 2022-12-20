import {combineReducers, configureStore} from '@reduxjs/toolkit'
import bookingReducer from './booking'
import categoryReducer from './category'
import userReducer from './user'

const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
  booking: bookingReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
