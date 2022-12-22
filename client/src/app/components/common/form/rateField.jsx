import React from 'react'
import PropTypes from 'prop-types'

const RateField = ({value, onChange}) => {
  return (
    <div onClick={() => onChange(value === 'asc' ? 'desc' : 'asc')}>
      <h5 className="d-inline card-rating m-1">Рейтинг</h5>
      {value === 'asc' ? (
        <i className="bi bi-caret-up-fill"></i>
      ) : (
        <i className="bi bi-caret-down-fill"></i>
      )}
    </div>
  )
}

RateField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default RateField
