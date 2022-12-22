import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {getIsLoggedIn, loadUsersList} from '../../../store/user'
import {loadCategoryList} from '../../../store/category'

const AppLoader = ({children}) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())

  useEffect(() => {
    dispatch(loadCategoryList())

    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader
