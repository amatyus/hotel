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
  note
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value})
  }
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

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
        {error && <div className="invalid-feedback">{error}</div>}
        {note && <p style={{fontSize: '15px', margin: '10px 0 0 0'}}>{note}</p>}
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
  note: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  emailErr: PropTypes.bool,
  onBlur: PropTypes.func
}

export default TextField
