// components/Welcome.js

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const Welcome = () => {
  const welcomeRef = useRef();
  const textRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(textRef.current, { duration: 1, y: -50, opacity: 0, ease: 'back.out(1.7)' });
    }, welcomeRef);

    return () => ctx.revert();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url('/assets/background.png')`, // Set the background image
    backgroundSize: 'cover', // Scale the image to fit the container
    backgroundPosition: 'center', // Center the image
  };

  const textStyle = {
    color: 'white',
    fontSize: '3rem',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
    padding: '1rem 2rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  };

  return (
    <div ref={welcomeRef} style={containerStyle}>
      <h1 ref={textRef} style={textStyle}>Welcome To Cloud Streaming Platform</h1>
    </div>
  );
};

export default Welcome;
