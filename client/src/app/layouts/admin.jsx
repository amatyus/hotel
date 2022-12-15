import React from 'react'
import AddRoomsPage from '../pages/addRoomPage'
import {useRooms} from '../hooks/useRooms'

const Admin = () => {
  const {createRoom} = useRooms()

  const handeleSubmit = (data) => {
    createRoom(data)
  }

  return (
    <>
      <AddRoomsPage onSubmit={handeleSubmit} />
    </>
  )
}

export default Admin
