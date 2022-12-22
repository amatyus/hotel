import React, {useState, useEffect, useRef} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../../css/dataForm.css'
import Dropdown from './dropdown'
import Button from '../common/button'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCurrentUserData} from '../../store/user'

const oneDay = 86000000

const BookingRoom = ({maxPeople, disabledDates, onSubmit}) => {
  const [formData, setFormData] = useState({
    arrivalDate: new Date(Date.now()),
    departureDate: new Date(Date.now() + oneDay),
    adults: 2,
    children: 0
  })

  const currentUser = useSelector(getCurrentUserData())

  const history = useHistory()

  const {arrivalDate, departureDate, adults, children} = formData

  const handleDateChange = (dates) => {
    const [start, end] = dates

    setFormData((prev) => ({
      ...prev,
      arrivalDate: start,
      departureDate: end
    }))
  }

  const handleIncrement = ({target}) => {
    const {value, name} = target
    setFormData((prevState) => ({
      ...prevState,
      [name]: +value + 1
    }))
  }

  const handleDecrement = ({target}) => {
    const {value, name} = target
    setFormData((prevState) => ({
      ...prevState,
      [name]: +value - 1
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const startDate = arrivalDate.setHours(0, 0, 0, 0)
    const endDate = departureDate.setHours(23, 59, 59, 999)

    onSubmit({...formData, arrivalDate: startDate, departureDate: endDate})
    history.push(`/user/${currentUser._id}`)
  }

  return (
    <>
      <form
        className="row g-3 bg-light mt-1 px-4 py-2 rounded d-flex align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="col m-0 p-0">
          <DatePicker
            selectsRange
            dateFormat="dd.MM.yyyy"
            selected={arrivalDate}
            startDate={arrivalDate}
            endDate={departureDate}
            onChange={handleDateChange}
            minDate={Date.now()}
            placeholderText={`${arrivalDate} - ${departureDate} `}
            className="date-picker-input "
            excludeDates={disabledDates}
          />
        </div>
        <div className="col m-0 p-0 ">
          <Dropdown
            adults={adults}
            childrens={children}
            handleInc={handleIncrement}
            handleDec={handleDecrement}
            max={maxPeople}
          />
        </div>

        <div className="col m-0 p-0 d-flex justify-content-end submit">
          <Button text="Забронировать" type="submit" />
        </div>
      </form>
    </>
  )
}

BookingRoom.propTypes = {
  maxPeople: PropTypes.number,
  onSubmit: PropTypes.func,
  disabledDates: PropTypes.array
}

export default BookingRoom
