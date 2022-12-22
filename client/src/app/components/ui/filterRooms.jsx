import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import Dropdown from './dropdown'
import Button from '../common/button'
import {useHistory} from 'react-router-dom'

import 'react-datepicker/dist/react-datepicker.css'
import '../../../css/dataForm.css'

const oneDay = 86000000

const FilterRooms = () => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    start: new Date(Date.now()),
    end: new Date(Date.now() + oneDay),
    adults: 2,
    children: 0
  })

  const {start, end, adults, children} = formData

  const handleDateChange = (dates) => {
    const [start, end] = dates
    setFormData((prev) => ({
      ...prev,
      start,
      end
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

    const startDate = start.setHours(0, 0, 0, 0)
    const endDate = end.setHours(23, 59, 59, 999)

    history.push(
      `/rooms?start=${startDate}&end=${endDate}&adults=${adults}&children=${children}`
    )
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
            selected={start}
            startDate={start}
            endDate={end}
            onChange={handleDateChange}
            minDate={Date.now()}
            placeholderText={`${start} - ${end} `}
            className="date-picker-input "
          />
        </div>
        <div className="col m-0 p-0 ">
          <Dropdown
            adults={adults}
            childrens={children}
            handleInc={handleIncrement}
            handleDec={handleDecrement}
          />
        </div>

        <div className="col m-0 p-0 d-flex justify-content-end submit">
          <Button text="Поиск" type="submit" />
        </div>
      </form>
    </>
  )
}

export default FilterRooms
