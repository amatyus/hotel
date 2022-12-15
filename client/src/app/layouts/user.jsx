import React from 'react'
import UserPage from '../pages/userPage/userPage'
import {useParams} from 'react-router-dom'
import EditUserPage from '../pages/editUserPage/editUserPage'
import RoomsListPage from '../pages/roomsListPage'
import {useSelector} from 'react-redux'
import {getCurrentUserId} from '../store/user'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
  const currentUserId = useSelector(getCurrentUserId())
  const params = useParams()
  const {edit} = params

  if (currentUserId) {
    return (
      <>
        <UsersLoader>
          {currentUserId ? (
            edit ? (
              <EditUserPage />
            ) : (
              <UserPage userId={currentUserId} />
            )
          ) : (
            <RoomsListPage />
          )}
        </UsersLoader>
      </>
    )
  }
}
export default Users
