import React from 'react'
import PropTypes from 'prop-types'

const Button = ({text, type, disabled, onClick, className}) => {
  return (
    <>
      <button
        type={type}
        className={'btn btn-dark ' + className}
        style={{background: '#0E1734'}}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default Button
