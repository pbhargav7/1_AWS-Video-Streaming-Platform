// components/PublicRoute.js

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const PublicRoute = ({ path, component: Component, rest }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []); 

  if (loading) return null;

  return user ? <Navigate to="/" replace /> :  <Component {...rest} />;
};

export default PublicRoute;
