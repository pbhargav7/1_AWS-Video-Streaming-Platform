// src/components/withAuth.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            async function checkAuth() {
                try {
                    const user = await Auth.currentAuthenticatedUser();
                    setIsLoggedIn(user !== null);
                } catch (error) {
                    navigate('/signin');
                }
            }
            checkAuth();
        });

        return isLoggedIn ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
