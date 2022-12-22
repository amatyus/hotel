import React from 'react'
import UserPage from '../pages/userPage/userPage'
import EditUserPage from '../pages/editUserPage/editUserPage'
import RoomsListPage from '../pages/roomsListPage'
import UsersLoader from '../components/ui/hoc/usersLoader'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCurrentUserId} from '../store/user'

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
