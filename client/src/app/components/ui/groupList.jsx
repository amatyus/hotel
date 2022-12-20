import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getCategory} from '../../store/category'

const GroupList = ({onItemSelect, selectedItem}) => {
  const category = useSelector(getCategory())

  return (
    <ul className="list-group list-group-flush">
      {category &&
        Object.keys(category).map((c) => (
          <li
            key={category[c]._id}
            className={
              'list-group-item category-sort' +
              (category[c] === selectedItem ? ' list-group-item-dark' : '')
            }
            onClick={() => {
              onItemSelect(category[c])
            }}
            role="button"
          >
            {category[c].name}
          </li>
        ))}
    </ul>
  )
}

GroupList.propTypes = {
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
}

export default GroupList
