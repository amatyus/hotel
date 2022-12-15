import React from 'react'
import PropTypes from 'prop-types'

const DropdownField = ({onChange, value, amount, name, type, text}) => {
  return (
    <>
      <span className="option-counter-container">
        <button
          className="optionCounterButton"
          disabled={amount}
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
  amount: PropTypes.bool,
  optionText: PropTypes.string,
  text: PropTypes.string
}

export default DropdownField
