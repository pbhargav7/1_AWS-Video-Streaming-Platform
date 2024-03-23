// CookieHandler.js
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const fetchCookies = async () => {
    try {
        const response = await fetch('http://54.172.208.104:3001/signed-cookies');
        const cookies = await response.json();
        return cookies;
    } catch (error) {
        console.error('Error fetching cookies:', error);
    }
};

const setCookies = (cookiesData) => {
    Object.entries(cookiesData).forEach(([key, value]) => {
        cookies.set(key, value);
    });
};

const isCookieExpired = (cookieName) => {
    const cookie = cookies.get(cookieName);
    return !cookie;
};

const CookieHandler = () => {
    const [cookieName] = useState('yourCookieName'); // Removed setCookieName

    useEffect(() => {
        const checkAndFetchCookies = async () => {
            if (isCookieExpired(cookieName)) {
                const fetchedCookies = await fetchCookies();
                setCookies(fetchedCookies);
            }
        };

        checkAndFetchCookies();
    }, [cookieName]);

    // Your component JSX here
    return (
        <></>
    );
};

export default CookieHandler;
