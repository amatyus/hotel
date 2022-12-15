import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Rooms from './layouts/rooms'
import User from './layouts/user'
import Admin from './layouts/admin'
import {RoomsProvider} from './hooks/useRooms'
import LogOut from './layouts/logOut'
import ProtectedRoute from './components/common/protectedRoute'
import RoomsListPage from './pages/roomsListPage'
import AdminProtectedRoute from './components/common/form/adminProtectedRoute'

import AppLoader from './components/ui/hoc/appLoader'

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />
        <RoomsProvider>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/rooms/:roomId/:edit?" component={Rooms} />
            <Route path="/rooms" component={RoomsListPage} />
            <AdminProtectedRoute path="/admin" component={Admin} />
            <Route path="/logout" component={LogOut} />

            <ProtectedRoute path="/user/:userId?/:edit?" component={User} />

            <Redirect to="/" />
          </Switch>
        </RoomsProvider>
      </AppLoader>
    </>
  )
}

export default App
