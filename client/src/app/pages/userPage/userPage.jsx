import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import UserCard from '../../components/ui/userCard'
import Loader from '../../components/common/form/loader'
import {useDispatch, useSelector} from 'react-redux'
import {getUserById} from '../../store/user'
import {format} from 'date-fns'

import {
  allLoadBookingList,
  getBookings,
  getBookingsLoadingStatus,
  loadBookingList,
  removeBooking
} from '../../store/booking'
import Table from '../../components/common/table/table'
import {useRooms} from '../../hooks/useRooms'

const UserPage = ({userId}) => {
  const user = useSelector(getUserById(userId))
  const booking = useSelector(getBookings())
  const isLoading = useSelector(getBookingsLoadingStatus())
  const dispatch = useDispatch()

  const transformData = (data) => {
    if (data) {
      const result = data.map((d) => ({
        ...d,
        arrivalDate: format(new Date(d.arrivalDate), 'dd.MM.yyyy'),
        departureDate: format(new Date(d.departureDate), 'dd.MM.yyyy'),
        totalPrice: `${d.totalPrice}$`
      }))
      return result
    }
  }

  const transformBookingData = transformData(booking)

  // все брони
  //   useEffect(() => {
  //     dispatch(allLoadBookingList())
  //   }, [])

  // брони пользователя
  useEffect(() => {
    dispatch(loadBookingList(userId))
  }, [])

  const handleRemoveComment = (id) => {
    dispatch(removeBooking(id))
  }

  if (user) {
    return (
      <>
        <div className="container mt-5">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3 px-5">
              <UserCard user={user} />
            </div>
            <div className="col px-5 mt-4">
              <h1>Забронированные номера:</h1>
              {!isLoading ? (
                <Table
                  onRemove={handleRemoveComment}
                  data={transformBookingData}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <Loader />
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
