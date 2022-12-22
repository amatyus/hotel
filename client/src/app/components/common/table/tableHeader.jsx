import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({columns}) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th key={column} scope="col" {...{role: columns[column].path}}>
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  )
}
TableHeader.propTypes = {
  columns: PropTypes.object.isRequired
}

export default TableHeader
