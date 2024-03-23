// components/AdminVideoUpload.js

import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { LinearProgress, TextField, ThemeProvider, createTheme, Typography, Box, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from '@mui/system';
import { Auth } from 'aws-amplify';
import withAuth from '../withAuth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
  },
});




const StyledDiv = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '& > * + *': {
    marginTop: '1rem',
  },
}));

const Background = styled('div')({
  backgroundImage: "url('/assets/netflix.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100vw',
  height: '100vh',
});


function AdminVideoUpload(props) {

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const checkAdmin = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const groups = userInfo.signInUserSession.accessToken.payload['cognito:groups'] || [];
      setIsAdmin(groups.includes('Admin'));
    };
    checkAdmin();
  }, []);

  const handleUpload = async (event) => {
    if (!isAdmin) {
      alert('You are not authorized to access this feature.');
      return <></>;
    }
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];

    if (fileType !== 'video') {
      alert('Please upload a video file.');
      return;
    }

    try {
      const { key } = await Storage.put(file.name, file, {
        contentType: file.type,
        level: 'public', // Add this line to set the access level to public
        progressCallback: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(percentCompleted);
        },
      });

      setUploading(true);
      console.log('Uploaded video with key:', key);
    } catch (error) {
      console.error('Error uploading the video:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    }
  };


  return (
    <Background>
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}>
          <StyledDiv>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              <Box
                component="span"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <CloudUploadIcon fontSize="large" />
                Video Upload
              </Box>
            </Typography>
            <TextField
              // label="Video File"
              type="file"
              accept="video/*"
              onChange={handleUpload}
            />
            {uploading && (
              <LinearProgress variant="determinate" value={progress} />
            )}
          </StyledDiv>
        </Grid>
      </ThemeProvider>
    </Background>
  );
};


export default withAuth(AdminVideoUpload)