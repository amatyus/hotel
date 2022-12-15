import React, {useState} from 'react'
import PropTypes from 'prop-types'

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  onBlur
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value})
  }
  const getInputClasses = () => {
    return 'form-control' + (error && booleanValue ? ' is-invalid' : '')
  }
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const booleanValue = Boolean(value)
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>

      <div className="input-group has-validation">
        <input
          type={showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && booleanValue && (
          <div className="invalid-feedback">{error}</div>
        )}
      </div>
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string,

  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  emailErr: PropTypes.bool,
  onBlur: PropTypes.func
}

export default TextField
