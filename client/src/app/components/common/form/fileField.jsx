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

      <input
        className="form-control"
        type="file"
        id="formFileMultiple"
        accept="image/png, image.jpg"
        multiple
        value={value}
        onChange={handleChange}
        name={name}
      ></input>
      {error && <div className="invalid-feedback ">{error}</div>}
    </div>
  )
}

FileField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default FileField
