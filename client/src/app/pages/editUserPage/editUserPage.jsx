import React, {useEffect, useState} from 'react'
import TextField from '../../components/common/form/textField'
import Loader from '../../components/common/form/loader'
import Button from '../../components/common/button'
import BackButton from '../../components/common/backButton'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {validator} from '../../utils/validateRules'
import {updateUser, getCurrentUserData} from '../../store/user'

const EditUserPage = () => {
  const history = useHistory()
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUserData())
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(updateUser({...data}))
  }

  useEffect(() => {
    if (currentUser && !data) {
      setData(currentUser)
    }
  }, [currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setLoading(false)
    }
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      }
    }
  }
  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  return (
    <div className="container mt-5">
      <BackButton />
      <div className="row g-flex justify-content-center">
        <div className="col-md-4 shadow p-4">
          {!isLoading ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Button
                text="Обновить"
                type="submit"
                className={'w-50 mx-auto d-block'}
                disabled={!isValid}
              />
            </form>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
