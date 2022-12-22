import React from 'react'
import PropTypes from 'prop-types'

const FileField = ({label, name, value, onChange, error}) => {
  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value})
  }

  return (
    <div className="mb-3">
      <label htmlFor="formFileMultiple" className="form-label">
        {label}
      </label>

      <div className="input-group has-validation">
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          accept="image/png, image/jpg"
          multiple
          value={value}
          onChange={handleChange}
          name={name}
        ></input>
        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  )
}

FileField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default FileField
