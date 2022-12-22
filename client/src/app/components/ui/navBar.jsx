import React from 'react'
import NavProfile from './navProfile'
import {Link, NavLink} from 'react-router-dom'
import {getIsLoggedIn, getCurrentUserData} from '../../store/user'
import {useSelector} from 'react-redux'

import '../../../css/navBar.css'

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  const currentUser = useSelector(getCurrentUserData())

  return (
    <>
      <nav className="navbar mt-4 px-5 ">
        <div className="container-fluid px-5">
          <div className="header-logo">
            <a className="navbar-brand" href="/">
              <span className="logo" style={{color: '#192252'}}>
                Cootels
              </span>
            </a>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link px-0 mx-3" to="/" exact>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link  px-0 mx-3" to="/rooms">
                Номера
              </NavLink>
            </li>

            {isLoggedIn && currentUser && currentUser.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link  px-0 mx-3" to="/admin">
                  Администратор
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex">
            {isLoggedIn ? (
              <NavProfile />
            ) : (
              <div className="header-login">
                <Link to="/login" className="btn">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
