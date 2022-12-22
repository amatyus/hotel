import React from 'react'
import PropTypes from 'prop-types'

import '../../../../css/dataForm.css'

const DropdownField = ({onChange, value, name, type, text, disabled}) => {
  return (
    <>
      <span className="option-counter-container">
        <button
          className="optionCounterButton px-1"
          disabled={disabled}
          onClick={onChange}
          name={name}
          value={value}
          type={type}
        >
          {text}
        </button>
      </span>
    </>
  )
}

DropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  optionText: PropTypes.string,
  text: PropTypes.string
}

export default DropdownField
