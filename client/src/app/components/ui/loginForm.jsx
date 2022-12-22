import React, {useState, useEffect} from 'react'
import TextField from '../common/form/textField'
import Button from '../common/button'
import {validator} from '../../utils/validateRules'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login, getAuthErrors} from '../../store/user'

const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const loginError = useSelector(getAuthErrors())
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const dispatch = useDispatch()

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/'
    dispatch(login({payload: data, redirect}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Email"
      />
      <TextField
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Password"
      />
      {loginError && <p className="text-danger">{loginError}</p>}

      <Button text="Submit" type="submit" disabled={!isValid} />
    </form>
  )
}

export default LoginForm
