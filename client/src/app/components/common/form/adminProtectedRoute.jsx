import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getIsLoggedIn, getCurrentUserData} from '../../../store/user'

function AdminProtectedRoute({component: Component, children, ...rest}) {
  const isLoggedIn = useSelector(getIsLoggedIn())
  const currentUser = useSelector(getCurrentUserData())

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn && !currentUser?.isAdmin) {
          return (
            <Redirect
              to={{
                pathname: '/main',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
        return Component ? <Component {...props} /> : children
      }}
    />
  )
}
AdminProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AdminProtectedRoute
