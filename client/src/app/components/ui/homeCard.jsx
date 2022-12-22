import React from 'react'
import PropTypes from 'prop-types'

import '../../../css/homeCard.css'

const HomeCard = ({title, subtitle, text}) => {
  return (
    <>
      <div className="card border-0">
        <div className="card-body m-0 p-0">
          <h5 className="title">{title}</h5>
          <h6 className="card-subtitle mt-5 ">{subtitle}</h6>
          <p className="card-text my-5">{text}</p>
        </div>
      </div>
    </>
  )
}

HomeCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string
}
export default HomeCard
