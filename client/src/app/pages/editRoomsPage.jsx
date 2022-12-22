import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import TextField from '../components/common/form/textField'
import TextAreaField from '../components/common/form/textAreaField'
import SelectField from '../components/common/form/selectField'
import Button from '../components/common/button'
import BackButton from '../components/common/backButton'
import FileField from '../components/common/form/fileField'
import Loader from '../components/common/form/loader'
import {validator} from '../utils/validateRules'
import {useRooms} from '../hooks/useRooms'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCategory, getCategoryLoadingStatus} from '../store/category'
import {getCurrentUserData} from '../store/user'

import '../../css/editRoomsPage.css'

const EditRoomsPage = ({roomId}) => {
  const [isLoading, setLoading] = useState(true)
  const [isSubmit, setIsSubmit] = useState(false)
  const {fetchRoom, updateRoomData, isLoading: roomLoading} = useRooms()
  const category = useSelector(getCategory())
  console.log('category', category)
  const categoryLoading = useSelector(getCategoryLoadingStatus())
  console.log('categoryLoading', categoryLoading)

  const [errors, setErrors] = useState({})
  const currentUser = useSelector(getCurrentUserData())
  const history = useHistory()
  const [data, setData] = useState()

  if (!currentUser?.isAdmin) {
    history.replace('/')
  }

  useEffect(() => {
    fetchRoom(roomId).then((roomData) => setData(roomData))
  }, [roomId])

  const categoryList = category?.map((с) => ({
    label: с.name,
    value: с._id
  }))

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
    }
  }

  useEffect(() => {
    if ((!roomLoading && !categoryLoading, data && !data)) {
      setData(data)
    }
  }, [roomLoading, categoryLoading, data, data])

  useEffect(() => {
    if (data && isLoading) {
      setLoading(false)
    }
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
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

  const handeleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    setIsSubmit(true)

    if (!isValid) return
    await updateRoomData(data._id, {
      ...data
    })
    history.goBack()
  }

  if (data && !categoryLoading) {
    return (
      <div className="card  m-5 px-5">
        <div className="card-body">
          <BackButton />
          <h3 className="edit-title mt-5">Редактировать данные о номере:</h3>
          <div className="form-body w-50">
            {!isLoading && Object.keys(category).length > 0 ? (
              <form onSubmit={handeleSubmit}>
                <TextField
                  label="Название"
                  name="title"
                  onChange={handleChange}
                  value={data.title}
                  placeholder="Введите название номера"
                />

                <TextAreaField
                  label="Описание"
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                  placeholder="Введите описание номера"
                />
                <TextField
                  label="Цена"
                  name="price"
                  onChange={handleChange}
                  value={data.price}
                  placeholder="Укажите цену номера за сутки"
                />
                {/* <FileField
                  label="Image"
                  name="image"
                  onChange={handleChange}
                  //   value={form.image}
                /> */}
                <TextField
                  label="Количество гостей"
                  name="maxPeople"
                  onChange={handleChange}
                  value={data.maxPeople || ''}
                  error={errors.maxPeople}
                  placeholder="Укажите максимальное количество гостей для данного номера"
                />
                <SelectField
                  label="Категория"
                  name="category"
                  defaultOption="Выберите категорию..."
                  options={categoryList}
                  onChange={handleChange}
                  value={data.category}
                />
                <Button
                  type="submit"
                  text="Сохранить изменения"
                  disabled={!isValid}
                ></Button>
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    )
  }
  return <Loader />
}

EditRoomsPage.propTypes = {
  roomId: PropTypes.string.isRequired
}

export default EditRoomsPage
