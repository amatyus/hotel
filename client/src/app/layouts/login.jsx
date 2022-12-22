import React, {useState} from 'react'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'
import {useParams} from 'react-router-dom'
import '../../css/login.css'

const Login = () => {
  const {type} = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    )
  }

  return (
    <>
      <div className="container text-center mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4  shadow p-4 align-self-center">
            {formType === 'login' ? (
              <>
                <h3 className="head mb-4">Вход</h3>
                <LoginForm />

                <p className="text-muted mt-3">
                  Dont have account?{' '}
                  <a
                    className="fw-bold text-body"
                    role="button"
                    onClick={toggleFormType}
                  >
                    Sign Up
                  </a>
                </p>
              </>
            ) : (
              <>
                <h3 className="head mb-4">Регистрация</h3>
                <RegisterForm />

                <p className="text-muted mt-3">
                  Have already an account? {''}
                  <a
                    className="fw-bold text-body"
                    role="button"
                    onClick={toggleFormType}
                  >
                    Sign In
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
