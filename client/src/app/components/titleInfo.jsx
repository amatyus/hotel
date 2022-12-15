import React from 'react'

const TitleInfo = () => {
  return (
    <>
      <div className="container  ">
        <div className="row">
          <div className="col">
            <div className="card">
              <img
                src={require(`../../img/single-room.jpg`)}
                className="card-img-top"
                alt="single-room"
              ></img>

              <div className="card-body px-0">
                <h5 className="card-title">Single Room</h5>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <img
                src={require(`../../img/double-room.jpg`)}
                className="card-img-top"
                alt="double-room"
              ></img>

              <div className="card-body px-0">
                <h5 className="card-title">Double Room</h5>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <img
                src={require(`../../img/cootege.jpg`)}
                className="card-img-top"
                alt="cootege"
              ></img>

              <div className="card-body px-0">
                <h5 className="card-title">Cootege</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

TitleInfo.propTypes = {
  //   roomId: PropTypes.string.isRequired
}

export default TitleInfo
