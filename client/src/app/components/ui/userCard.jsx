import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCurrentUserData, getCurrentUserId} from '../../store/user'

import '../../../css/userCard.css'

const UserCard = ({user}) => {
  const currentUser = useSelector(getCurrentUserData())
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <div className="card mb-3">
      <div className="card-body user-card ">
        {currentUser && currentUserId === user._id && (
          <Link
            to={`/user/${currentUserId}/edit`}
            className="position-absolute top-0 end-0 btn btn-sm m-1"
          >
            <i className="bi bi-gear"></i>
          </Link>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={user.image} className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>Имя: {user.name}</h4>
            <h4>Электронная почта: {user.email}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
UserCard.propTypes = {
  user: PropTypes.object
}

export default UserCard
