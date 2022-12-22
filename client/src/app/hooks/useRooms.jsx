import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import roomService from '../services/room.service'

const RoomsContext = React.createContext()

export const useRooms = () => {
  return useContext(RoomsContext)
}

export const RoomsProvider = ({children}) => {
  const [rooms, setRooms] = useState([])
  const [count, setCount] = useState(0)
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchRooms = async (queryParams) => {
    try {
      setLoading(true)
      const {content} = await roomService.fetchAll(queryParams)
      const {rooms, count} = content[0]
      setRooms(rooms)
      setCount(count)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
    setLoading(false)
  }

  const fetchRoom = async (roomId) => {
    const {content} = await roomService.get(roomId)
    return content
  }

  const updateRoomData = async (id, data) => {
    try {
      const {content} = await roomService.update(id, data)
      setRooms((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) {
            return content
          }
          return item
        })
      )
      return content
    } catch (error) {
      setError(error)
    }
  }

  async function createRoom(data) {
    try {
      const {content} = await roomService.create(data)
      setRooms((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function removeRoom(id) {
    try {
      const {content} = await roomService.remove(id)
      if (content === null) {
        setRooms((prevState) => prevState.filter((r) => r._id !== id))
      }
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    if (error !== null) {
      setError(null)
    }
  }, [error])

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        fetchRoom,
        fetchRooms,
        updateRoomData,
        removeRoom,
        createRoom,
        isLoading,
        count
      }}
    >
      {children}
    </RoomsContext.Provider>
  )
}

RoomsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
