import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {logOut} from '../store/user'

import Loader from '../components/common/form/loader'
const LogOut = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logOut())
  }, [])
  return <Loader />
}

export default LogOut
