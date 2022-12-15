import React from 'react'
import PropTypes from 'prop-types'
import UserCard from '../../components/ui/userCard'
import Loader from '../../components/common/form/loader'
import {useSelector} from 'react-redux'
import {getUserById} from '../../store/user'

const UserPage = ({userId}) => {
  const user = useSelector(getUserById(userId))

  if (user) {
    return (
      <>
        <div className="container mt-5">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
            </div>
            <div className="col-md-8">
              {/* <CommentsProvider>
                <Comments />
              </CommentsProvider> */}
              <h1>Забронированные номера</h1>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <Loader />
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
