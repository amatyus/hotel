import React from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import Button from '../components/common/button'
import '../../css/roomCard.css'
import {useRooms} from '../hooks/useRooms'
import {useSelector} from 'react-redux'
import {getCurrentUserData} from '../store/user'

const RoomsPage = ({title, id, image, rating}) => {
  const history = useHistory()
  const {removeRoom} = useRooms()

  const currentUser = useSelector(getCurrentUserData())

  const handleRemoveComment = (id) => {
    removeRoom(id)
  }

  const handleOpen = () => {
    history.push(`/rooms/${id}`)
  }
  return (
    <>
      <div className="col px-5 my-5">
        <div className="card ">
          {image && (
            <img
              src={require(`../../img/${image[0]}`)}
              className="card-img-top"
              alt="imageRoom"
            ></img>
          )}

          <div className="card-body px-0">
            <h5 className="card-title">{title}</h5>
            <h6 className="card-rating">
              {rating}
              <i className="bi bi-star-fill mx-1"></i>
            </h6>
            <Button type="button" text="Подробнее" onClick={handleOpen} />
            {currentUser && currentUser.isAdmin && (
              <Button
                type="button"
                text="Удалить номер"
                className={'mx-3'}
                onClick={() => handleRemoveComment(id)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

RoomsPage.propTypes = {
  title: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  description: PropTypes.string,
  rating: PropTypes.number
}

export default RoomsPage
