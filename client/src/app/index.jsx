import React, { useState, useEffect } from 'react'
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  matchPath,
  BrowserRouter
} from 'react-router-dom'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import SideNav from '../components/SideNav'
import PublicRoute from '../components/PublicRoute'
import PrivateRoute from '../components/PrivateRoute'

import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Registeration from '../pages/Registeration'

import Profile from '../views/Profile'

// import Dashboard from '../views/dashboard'


import 'ant-design-pro/dist/ant-design-pro.css'
import S from './style'

import AppHeader from '../components/AppHeader'
import UserList from '../components/usersView'
import RiderList from '../views/ridersList'
import BikeListingPage from '../views/BikeListing/BikeListing'

// public routes redirects to /app if authenticated
// private routes redirects to login if not authenticated
const App = () => {
  return (
    // <BrowserRouter>
    <Switch>
    <PublicRoute path="/login" component={Login} />
    <Route path="/Register" component={Registeration} />
    <PrivateRoute path="/app" component={AuthnticatedApp} />
      {/* future landing page redirect to app for now */}
      <Route exact path="/">
        <Redirect to="/app" />
      </Route>
      <Route path="*" component={NotFoundPage} />
      </Switch>
    // </BrowserRouter>
  )
}

const AuthnticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Content } = Layout

  const location = useLocation()

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  const currentLocationIS = (pathToMatch) => {
    const match = matchPath(location.pathname, pathToMatch)
    if (!match) return false

    return true
  }

  const dispatch = useDispatch()



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideNav collapsed={collapsed} onCollapse={onCollapse} />

      <Layout
        style={{
          marginLeft: collapsed === true ? 80 : 200,
          transition: 'margin-left .2s'
        }}
      >
        <AppHeader courseNavigation={currentLocationIS('/app/course/:id')} />

        <Content style={{ padding: '20px 32px', height: '100%' }}>
            <Switch>
           

            {/* <Route path="/app/dashboard" component={Dashboard} /> */}
        
            <Route path="/app/userlist" component={UserList}/>
            <Route path="/app/riderlist" component={RiderList}/>

            {/* Customer module */}
            <Route path="/app/bikes" component={BikeListingPage}/>
            
            <Route path="/app/profile" component={Profile} />
           
            </Switch>
        </Content>
        <S.Footer>Copyright ©2024 Bike Buddies</S.Footer>
      </Layout>
    </Layout>
  )
}

export default App
