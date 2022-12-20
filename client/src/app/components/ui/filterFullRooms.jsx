import React, {useState, useEffect, useRef} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../../css/dataForm.css'
import Dropdown from './dropdown'
import Button from '../common/button'
import GroupField from '../common/form/groupField'
import RateField from '../common/form/rateField'
import PropTypes from 'prop-types'

const FilterFullRooms = ({initFormData, onSubmit}) => {
  const [formData, setFormData] = useState({
    ...initFormData
  })
  const {start, end, adult, children, category, rate} = formData
  const handleDateChange = (dates) => {
    const [start, end] = dates
    setFormData((prev) => ({
      ...prev,
      start,
      end
    }))
  }

  const handleFormFieldChange = (value, name) => {
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleIncrement = ({target}) => {
    const {value, name} = target
    handleFormFieldChange(+value + 1, name)
  }

  const handleDecrement = ({target}) => {
    const {value, name} = target
    handleFormFieldChange(+value - 1, name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(formData)
  }

  return (
    <>
      <form
        className="row g-3 bg-light mt-1 px-4 py-2 rounded d-flex align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="col m-0 p-0">
          <GroupField
            value={category}
            onChange={(value) => handleFormFieldChange(value, 'category')}
          />
        </div>
        <div className="col m-0 p-0">
          <RateField
            value={rate}
            onChange={(value) => handleFormFieldChange(value, 'rate')}
          />
        </div>
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
            adult={adult}
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

FilterFullRooms.propTypes = {
  initFormData: PropTypes.object,
  onSubmit: PropTypes.func
}

export default FilterFullRooms
