import React from 'react'
import {useParams} from 'react-router-dom'
import RoomPage from '../components/roomPage'
import EditRoomsPage from '../pages/editRoomsPage'

const Rooms = () => {
  const params = useParams()
  const {roomId, edit} = params

  return (
    <>
      {edit ? <EditRoomsPage roomId={roomId} /> : <RoomPage roomId={roomId} />}
    </>
  )
}

export default Rooms
