import {createSlice} from '@reduxjs/toolkit'
import caregoryService from '../services/category.service'
import isOutdated from '../utils/isOutdated'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    categoryRequested: (state) => {
      state.isLoading = true
    },
    categoryReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    categoryRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const {reducer: categoryReducer, actions} = categorySlice
const {categoryRequested, categoryReceived, categoryRequestFailed} = actions

export const loadCategoryList = () => async (dispatch, getState) => {
  const {lastFetch} = getState().category
  if (isOutdated(lastFetch)) {
    dispatch(categoryRequested())
    try {
      const {content} = await caregoryService.get()
      dispatch(categoryReceived(content))
    } catch (error) {
      dispatch(categoryRequestFailed(error.message))
    }
  }
}

export const getCategory = () => (state) => state.category.entities
export const getCategoryLoadingStatus = () => (state) =>
  state.category.isLoading
export const getCategoryById = (id) => (state) => {
  if (state.category.entities) {
    return state.category.entities.find((с) => с._id === id)
  }
}

export default categoryReducer
