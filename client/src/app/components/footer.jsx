import React from 'react'
import {Link} from 'react-router-dom'

import '../../css/footer.css'

const Footer = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark mt-5 p-5">
        <span className="logo" style={{color: '#ffffff'}}>
          Cootels
        </span>

        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link link-footer" to="/rooms">
              Номера
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Footer
