import React from 'react'
import PropTypes from 'prop-types'

const FormField = ({children}) => (
  <div className="w-auto m-0 px-2 text-center">{children}</div>
)

FormField.propTypes = {
  children: PropTypes.element
}

export default FormField
