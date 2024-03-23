// components/SignIn.js

import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const SignInContainer = styled(Paper)({
  padding: '2rem',
  width: '400px',
  margin: '2rem auto',
});

const SignIn = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(formData);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error signing in: ' + error.message);
    }
  };

  return (
    <SignInContainer>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
        <TextField
        fullWidth
        required
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
    </Box>
    <Box mb={2}>
      <TextField
        fullWidth
        required
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
    </Box>
    <Button fullWidth variant="contained" color="primary" type="submit">
      Sign In
    </Button>
  </form>
</SignInContainer>
);
};

export default SignIn;