import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/common/button'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useRooms} from '../hooks/useRooms'
import {getCurrentUserData} from '../store/user'

import '../../css/roomCard.css'

const RoomsPage = ({title, _id: roomId, image, rating}) => {
  const history = useHistory()
  const {removeRoom} = useRooms()
  const currentUser = useSelector(getCurrentUserData())

  const handleRemoveComment = (roomId) => {
    removeRoom(roomId)
  }

  const handleOpen = () => {
    history.push(`/rooms/${roomId}`)
  }

  return (
    <div className="col px-5 my-5">
      <div className="card ">
        {image && (
          <div className="filters_img">
            <img
              src={require(`../../img/${image[0]}`)}
              className="card-img-top"
              alt="imageRoom"
            ></img>
          </div>
        )}

        <div className="card-body px-0">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-rating">
            {rating}
            <i className="bi bi-star-fill mx-1"></i>
          </h6>
          <div>
            <Button type="button" text="Подробнее" onClick={handleOpen} />
          </div>
          <div>
            {currentUser && currentUser.isAdmin && (
              <Button
                type="button"
                text="Удалить номер"
                className={'mt-3 '}
                onClick={() => handleRemoveComment(roomId)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

RoomsPage.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  description: PropTypes.string,
  rating: PropTypes.number
}

export default RoomsPage
