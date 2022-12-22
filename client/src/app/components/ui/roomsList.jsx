import React from 'react'
import PropTypes from 'prop-types'
import {useRooms} from '../../hooks/useRooms'

const RoomsList = ({rooms}) => {
  const {isLoading} = useRooms()
  if (!isLoading) return 'Loadind ...'

  return (
    <>
      {rooms.map((room) => (
        <span key={room._id}>{room.title}</span>
      ))}
    </>
  )
}

RoomsList.propTypes = {
  rooms: PropTypes.array
}

export default RoomsList
