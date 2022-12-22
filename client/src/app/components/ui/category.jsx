import React from 'react'
import PropTypes from 'prop-types'
import Loader from '../common/form/loader'
import {useSelector} from 'react-redux'
import {getCategoryLoadingStatus, getCategoryById} from '../../store/category'

const Category = ({id}) => {
  const isLoading = useSelector(getCategoryLoadingStatus())
  const category = useSelector(getCategoryById(id))

  if (!isLoading) {
    return <p>{category.name}</p>
  } else {
    return <Loader />
  }
}
Category.propTypes = {
  id: PropTypes.string
}

export default Category
