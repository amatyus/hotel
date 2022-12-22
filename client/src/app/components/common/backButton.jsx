import React from 'react'
import {useHistory} from 'react-router-dom'

const BackButton = () => {
  const history = useHistory()
  return (
    <button
      className="btn btn-dark "
      style={{background: '#0E1734'}}
      onClick={() => history.goBack()}
    >
      Назад
    </button>
  )
}

export default BackButton
