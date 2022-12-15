import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({label, name, value, onChange, error, placeholder}) => {
  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value})
  }
  const getInputClasses = () => {
    return 'form-control' + (error && booleanValue ? ' is-invalid' : '')
  }

  const booleanValue = Boolean(value)

  return (
    <div className="mb-4">
      <label htmlFor={name}> {label}</label>
      <div className="input-group has-validation">
        <textarea
          id={name}
          name={name}
          rows="4"
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          placeholder={placeholder}
        />

        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  )
}
TextAreaField.defaultProps = {
  type: 'text'
}
TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string
}

export default TextAreaField
