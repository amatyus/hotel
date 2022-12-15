import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Loader from '../../common/form/loader'
import {getDataStatus, loadUsersList} from '../../../store/user'

const UsersLoader = ({children}) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])
  if (!dataStatus) return <Loader />
  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UsersLoader
