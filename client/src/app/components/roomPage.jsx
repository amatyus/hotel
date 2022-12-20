import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Loader from './common/form/loader'
import {useHistory} from 'react-router-dom'
import Button from './common/button'
import Carousel from 'react-multi-carousel'
import '../../css/roomPage.css'
import 'react-multi-carousel/lib/styles.css'
import BackButton from './common/backButton'
import BookingRoom from '../components/ui/bookingRoom'
import {useRooms} from '../hooks/useRooms'
import {useSelector} from 'react-redux'
import {getCategoryById, getCategoryLoadingStatus} from '../store/category'
import {getCurrentUserData} from '../store/user'
import bookingService from '../services/booking.service'

const RoomPage = ({roomId}) => {
  const {getRoom} = useRooms()
  const room = getRoom(roomId)
  const history = useHistory()
  const category = useSelector(getCategoryById(room.category))
  const categoryLoading = useSelector(getCategoryLoadingStatus())
  const currentUser = useSelector(getCurrentUserData())
  const [disabledDates, setDisabledDates] = useState([])
  console.log(roomId)
  console.log(room)

  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2
    }
  }
  const handleEdit = () => {
    history.push(`/rooms/${roomId}/edit`)
  }

  const onBooking = (formData) => {
    const dataSend = {
      ...formData,
      roomId
    }

    bookingService.create(dataSend)
  }

  useEffect(() => {
    bookingService
      .disabledDates({
        arrivalDate: new Date().getTime()
      })
      .then(({content}) => {
        const daysArray = content.reduce((days, period) => {
          const daysPeriod = []
          const {arrivalDate, departureDate} = period
          const start = new Date(arrivalDate)
          const end = new Date(departureDate)

          let date = start
          while (date <= end) {
            daysPeriod.push(date)
            date = new Date(date.getTime() + 24 * 60 * 60 * 1000)
          }

          return [...days, ...daysPeriod]
        }, [])

        setDisabledDates(daysArray)
      })
  }, [])

  if (room && !categoryLoading && room.image) {
    return (
      <>
        <div className="row p-5">
          <div className="px-5">
            <BackButton />
          </div>

          <div className="card p-5 ">
            <Carousel responsive={responsive}>
              {room &&
                room.image &&
                room.image.map((img) => (
                  <div key={room}>
                    <img
                      key={room.id}
                      src={require(`../../img/${img}`)}
                      alt="..."
                      className="w-50"
                    />
                  </div>
                ))}
            </Carousel>

            <div className="card-body ">
              <h5 className="card-title">{room.title}</h5>
              <p className="card-text">{room.description}</p>
              <p className="card-text-price">Price: {room.price}$</p>
              <p className="card-text-category">Category: {category.name} </p>
              <p className="card-text-rating">Rating: {room.rating}</p>

              <BookingRoom
                maxPeople={room.maxPeople}
                onSubmit={onBooking}
                disabledDates={disabledDates}
              />

              {currentUser && currentUser.isAdmin && (
                <Button
                  type="button"
                  className=" mx-4"
                  text="Редактировать"
                  onClick={handleEdit}
                />
              )}
              {/* {!userLoading && currentUser && currentUser.isAdmin && (
                <Button
                  type="button"
                  text="Удалить номер"
                  onClick={() => handleRemoveComment(roomId)}
                />
              )} */}
            </div>
          </div>
        </div>
      </>
    )
  }
  return <Loader />
}

RoomPage.propTypes = {
  roomId: PropTypes.string.isRequired
}

export default RoomPage
