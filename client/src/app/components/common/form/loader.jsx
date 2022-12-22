import React from 'react'
import '../../../../css/loader.css'

const Loader = () => {
  return (
    <>
      <div className="text-center mt-5 py-5 d-flex justify-content-center ">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  )
}

export default Loader
