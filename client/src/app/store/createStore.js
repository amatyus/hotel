import {combineReducers, configureStore} from '@reduxjs/toolkit'
import categoryReducer from './category'
import userReducer from './user'

const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
