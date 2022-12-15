import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import TextField from '../components/common/form/textField'
import TextAreaField from '../components/common/form/textAreaField'
import SelectField from '../components/common/form/selectField'
import Button from '../components/common/button'
import '../../css/editRoomsPage.css'
import BackButton from '../components/common/backButton'
import {validator} from '../utils/validateRules'
import FileField from '../components/common/form/fileField'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCategory} from '../store/category'

const AddRoomsPage = ({onSubmit}) => {
  const [data, setData] = useState({})
  const category = useSelector(getCategory())
  const [errors, setErrors] = useState({})
  const history = useHistory()

  const categoryList = category.map((с) => ({
    label: с.name,
    value: с._id
  }))

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    title: {
      isRequired: {
        message: 'Заголовок обязательно должен быть заполнен'
      }
    },
    description: {
      isRequired: {
        message: 'Описание номера обязательно должно быть заполнено'
      }
    },
    price: {
      message: 'Минимальная цена не должна быть меньше одного символа',
      value: 1
    },
    category: {
      isRequired: {
        message: 'Выберите категорию номера'
      }
    },
    maxPeople: {
      message: 'Минимальное количество людей не должно быть меньше 1',
      value: 1
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  const clearForm = () => {
    setData({})
    setErrors({})
  }

  const handeleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    console.log(data)
    clearForm()
    history.push(`/rooms`)
  }

  return (
    <div className="card  m-5 px-5">
      <div className="card-body">
        <BackButton />
        <h3 className="edit-title mt-5">Добавить новый номер:</h3>
        <div className="form-body w-50">
          <form onSubmit={handeleSubmit}>
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}
              value={data.title || ''}
              error={errors.title}
              placeholder="Title Room"
            />
            <TextAreaField
              label="Description"
              name="description"
              onChange={handleChange}
              value={data.description || ''}
              error={errors.description}
              placeholder="Description Room"
            />
            <TextField
              label="Price"
              name="price"
              onChange={handleChange}
              value={data.price || ''}
              error={errors.price}
              placeholder="Price Room"
            />
            <TextField
              label="Max People"
              name="maxPeople"
              onChange={handleChange}
              value={data.maxPeople || ''}
              error={errors.maxPeople}
              placeholder="Max People"
            />
            {/* <FileField
              label="Image"
              name="image"
              onChange={handleChange}
              error={errors.image}
              value={data.image}
            /> */}
            <SelectField
              label="Category"
              name="category"
              defaultOption="Выберите категорию..."
              options={categoryList}
              onChange={handleChange}
              value={data.category || ''}
              error={errors.category}
              placeholder="Category Room"
            />
            <Button type="submit" text="Добавить" disabled={!isValid} />
          </form>
        </div>
      </div>
    </div>
  )
}

AddRoomsPage.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default AddRoomsPage
