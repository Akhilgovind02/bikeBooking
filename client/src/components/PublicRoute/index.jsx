import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ ...routeProps }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const usersData = window.localStorage.getItem('elearning-user')
  const data = JSON.parse(usersData)
  console.log(data.user.role)

  return (
    <>
      {isAuth && data && (
        <>
          {data.user.role === 'customer' && <Redirect to="/customer" />}
          {data.user.role === 'rider' && <Redirect to="/rider" />}
          {data.user.role === 'admin' && <Route {...routeProps} />}
        </>
      )}
      {!isAuth && <Route {...routeProps} />}
    </>
  );
}

export default PublicRoute;
