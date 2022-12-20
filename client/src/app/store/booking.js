import {createAction, createSlice} from '@reduxjs/toolkit'
import bookingService from '../services/booking.service'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    bookingRequested: (state) => {
      state.isLoading = true
    },
    bookingReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    bookingRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    bookingRemoved: (state, action) => {
      state.entities = state.entities.filter((b) => b._id !== action.payload)
    }
  }
})

const {reducer: bookingReducer, actions} = bookingSlice
const {bookingRequested, bookingReceved, bookingRequestFiled, bookingRemoved} =
  actions

const removeBookingRequested = createAction('booking/removeBookingtRequested')

export const loadBookingList = (userId) => async (dispatch) => {
  dispatch(bookingRequested())
  try {
    const {content} = await bookingService.get(userId)
    dispatch(bookingReceved(content))
  } catch (error) {
    dispatch(bookingRequestFiled(error.message))
  }
}

export const allLoadBookingList = () => async (dispatch) => {
  dispatch(bookingRequested())
  try {
    const {content} = await bookingService.fetchAll()
    console.log(content)
    dispatch(bookingReceved(content))
  } catch (error) {
    dispatch(bookingRequestFiled(error.message))
  }
}

export const removeBooking = (bookingId) => async (dispatch) => {
  dispatch(removeBookingRequested())
  try {
    const {content} = await bookingService.remove(bookingId)
    if (!content) {
      dispatch(bookingRemoved(bookingId))
    }
  } catch (error) {
    dispatch(bookingRequestFiled(error.message))
  }
}

export const getBookings = () => (state) => state.booking.entities
export const getBookingsLoadingStatus = () => (state) => state.booking.isLoading

export default bookingReducer
