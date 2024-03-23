import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled(Paper)({
  padding: '2rem',
  width: '400px',
  margin: '2rem auto',
});

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.signUp(formData);
      alert('Registration successful! Please check your email for a confirmation code.');
    } catch (error) {
      console.error(error);
      alert('Error signing up: ' + error.message);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(formData.username, otp, { forceAliasCreation: false });
      alert('Account verified! You can now sign in.');
      navigate('/'); // Redirect to home page after successful verification
    } catch (error) {
      console.error('Error verifying account: ', error);
      alert('Error verifying account: ' + error.message);
    }
  };

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(formData.username);
      alert('Confirmation code resent successfully');
    } catch (err) {
      console.error('Error resending code: ', err);
      alert('Error resending code: ' + err.message);
    }
  };

  // const listenToAutoSignInEvent = () => {
  //   Hub.listen('auth', ({ payload }) => {
  //     const { event } = payload;
  //     if (event === 'autoSignIn') {
  //       // const user = payload.data;
  //       console.log('TODO: Future Auto Login User After Registration');
  //       // assign user
  //     } else if (event === 'autoSignIn_failure') {
  //       // redirect to sign in page
  //       navigate('/signin');
  //     }
  //   });
  // };

  // useEffect(() => {
  //   listenToAutoSignInEvent();
  // }, []);

  return (
    <SignUpContainer>
      <Typography variant="h4" gutterBottom>
        Sign Up
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
        <Box mb={2}>
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
        <Button fullWidth variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
      <Typography variant="h6" gutterBottom>
        Verify Account
      </Typography>
      <form onSubmit={handleVerification}>
        <Box mb={2}>
          <TextField
      fullWidth
      required
      label="OTP"
      name="otp"
      value={otp}
      onChange={handleOtpChange}
    />
  </Box>
  <Button fullWidth variant="contained" color="secondary" type="submit">
    Verify Account
  </Button>
</form>
<Box mt={2}>
  <Button fullWidth variant="outlined" color="primary" onClick={resendConfirmationCode}>
    Resend Confirmation Code
  </Button>
</Box>
</SignUpContainer>
);
};

export default SignUp;

