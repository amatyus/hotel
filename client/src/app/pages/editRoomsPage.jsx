import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import TextField from '../components/common/form/textField'
import TextAreaField from '../components/common/form/textAreaField'
import SelectField from '../components/common/form/selectField'
import Button from '../components/common/button'
import '../../css/editRoomsPage.css'
import BackButton from '../components/common/backButton'
import FileField from '../components/common/form/fileField'
import {validator} from '../utils/validateRules'
import {useRooms} from '../hooks/useRooms'
import Loader from '../components/common/form/loader'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCategory, getCategoryLoadingStatus} from '../store/category'
import {getCurrentUserData} from '../store/user'

const EditRoomsPage = ({roomId}) => {
  const [isLoading, setLoading] = useState(true)
  const {getRoom, updateRoomData, isLoading: roomLoading} = useRooms()
  const category = useSelector(getCategory())
  const categoryLoading = useSelector(getCategoryLoadingStatus())
  const currentRoom = getRoom(roomId)
  const [errors, setErrors] = useState({})
  const currentUser = useSelector(getCurrentUserData())
  const history = useHistory()

  if (!currentUser?.isAdmin) {
    history.replace('/')
  }

  const [data, setData] = useState()

  const categoryList = category.map((с) => ({
    label: с.name,
    value: с._id
  }))

  const handeleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    await updateRoomData(data._id, {
      ...data
    })
    history.goBack()
    // history.push(`/user/${currentUser.id}`)
  }

  const validatorConfig = {
    title: {
      isRequired: {
        message: 'Title обязателен для заполнения'
      }
    },
    description: {
      isRequired: {
        message: 'Description обязателен для заполнения'
      }
    },
    price: {
      min: {
        message: 'Pricе обязателен для заполнения',
        value: 2
      }
    },
    category: {
      isRequired: {
        message: 'Выберете сategory'
      }
    }
  }

  useEffect(() => {
    if ((!roomLoading && !categoryLoading, currentRoom && !data)) {
      setData(currentRoom)
    }
  }, [roomLoading, categoryLoading, currentRoom, data])

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
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  return (
    <div className="card  m-5 px-5">
      <div className="card-body">
        <BackButton />
        <h3 className="edit-title mt-5">Редактировать данные о номере:</h3>
        <div className="form-body w-50">
          {!isLoading && Object.keys(category).length > 0 ? (
            <form onSubmit={handeleSubmit}>
              <TextField
                label="Title"
                name="title"
                onChange={handleChange}
                value={data.title}
              />

              <TextAreaField
                label="Description"
                name="description"
                onChange={handleChange}
                value={data.description}
              />
              <TextField
                label="Price"
                name="price"
                onChange={handleChange}
                value={data.price}
              />
              <FileField
                label="Image"
                name="image"
                onChange={handleChange}
                //   value={form.image}
              />
              <SelectField
                label="Category"
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

EditRoomsPage.propTypes = {
  roomId: PropTypes.string.isRequired
}

export default EditRoomsPage
