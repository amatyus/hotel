import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import TextField from '../components/common/form/textField'
import TextAreaField from '../components/common/form/textAreaField'
import SelectField from '../components/common/form/selectField'
import Button from '../components/common/button'
import BackButton from '../components/common/backButton'
import FileField from '../components/common/form/fileField'
import {validator} from '../utils/validateRules'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCategory} from '../store/category'

import '../../css/editRoomsPage.css'

const AddRoomsPage = ({onSubmit}) => {
  const [data, setData] = useState({
    title: '',
    description: '',
    price: '',
    maxPeople: '',
    image: '',
    category: ''
  })
  const category = useSelector(getCategory())
  const [errors, setErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const history = useHistory()

  const categoryList = category?.map((с) => ({
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
      isRequired: {
        message: 'Цена обязательно должен быть заполнен'
      }
    },
    category: {
      isRequired: {
        message: 'Выберите категорию номера'
      }
    },
    maxPeople: {
      isRequired: {
        message: 'Количество людей обязательно для заполнения'
      }
    }
  }

  useEffect(() => {
    isSubmit && validate()
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
    setIsSubmit(true)
    if (!isValid) return
    const transformedData = {
      ...data,
      image: data.image.split(',')
    }
    onSubmit(transformedData)
    console.log(transformedData)
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
              label="Название"
              name="title"
              onChange={handleChange}
              value={data.title || ''}
              error={errors.title}
              placeholder="Введите название номера"
            />
            <TextAreaField
              label="Описание"
              name="description"
              onChange={handleChange}
              value={data.description || ''}
              error={errors.description}
              placeholder="Введите описание номера"
            />
            <TextField
              label="Цена"
              name="price"
              onChange={handleChange}
              value={data.price || ''}
              error={errors.price}
              placeholder="Укажите цену номера за сутки"
            />
            <TextField
              label="Количество гостей"
              name="maxPeople"
              onChange={handleChange}
              value={data.maxPeople || ''}
              error={errors.maxPeople}
              placeholder="Укажите максимальное количество гостей для данного номера"
            />
            {/* <FileField
              label="Фото"
              name="image"
              onChange={handleChange}
              error={errors.image}
              value={data.image || ''}
            /> */}
            <TextField
              label="Фото"
              name="image"
              onChange={handleChange}
              error={errors.image}
              value={data.image || ''}
              placeholder="Введите названия картинок"
              note={
                'Имена должны быть с расширением(например, room.jpg), записываются через запятую. Первая картинка в списке будет главной'
              }
            />
            <SelectField
              label="Категория"
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
