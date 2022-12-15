import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import '../../../css/navProfile.css'
import {useSelector} from 'react-redux'
import {getCurrentUserData} from '../../store/user'
import Loader from '../common/form/loader'

function NavProfile() {
  const currentUser = useSelector(getCurrentUserData())

  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }

  if (!currentUser) return <Loader />

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center ">
        <div className="me-2 user">{currentUser.name}</div>
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link to={`/user/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
