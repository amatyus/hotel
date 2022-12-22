import React, {useState, useEffect, useRef} from 'react'
import DatePicker from 'react-datepicker'
import Dropdown from './dropdown'
import Button from '../common/button'
import RateField from '../common/form/rateField'
import PropTypes from 'prop-types'
import SelectField from '../common/form/selectField'
import {getCategory} from '../../store/category'
import {useSelector} from 'react-redux'
import FormField from '../../components/common/form/formField'

import 'react-datepicker/dist/react-datepicker.css'
import '../../../css/dataForm.css'

const FilterFullRooms = ({initFormData, onSubmit}) => {
  const [formData, setFormData] = useState({
    ...initFormData
  })
  const {start, end, adults, children, category, rate} = formData
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

  const categories = useSelector(getCategory())

  const categoryList = [
    ...(categories
      ? categories.map((с) => ({
          label: с.name,
          value: с._id
        }))
      : []),
    {label: 'Показать все', value: ''}
  ]

  return (
    <>
      <form
        className="row g-3 bg-light mt-4 m-5 p-2 rounded d-flex align-items-center justify-content-between"
        onSubmit={handleSubmit}
      >
        <FormField>
          <SelectField
            name="category"
            defaultOption="Выберите категорию..."
            options={categoryList}
            onChange={({value, name}) => handleFormFieldChange(value, name)}
            value={category}
            placeholder="Category Room"
          />
        </FormField>
        <FormField>
          <RateField
            value={rate}
            onChange={(value) => handleFormFieldChange(value, 'rate')}
          />
        </FormField>
        <FormField>
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
        </FormField>
        <FormField>
          <Dropdown
            adults={adults}
            childrens={children}
            handleInc={handleIncrement}
            handleDec={handleDecrement}
          />
        </FormField>

        <FormField>
          <Button text="Поиск" type="submit" />
        </FormField>
      </form>
    </>
  )
}

FilterFullRooms.propTypes = {
  initFormData: PropTypes.object,
  onSubmit: PropTypes.func
}

export default FilterFullRooms
