import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomVideoPlayer from './CustomVideoPlayer';
import './videoQualityPlugin';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import withAuth from '../withAuth';
import { getVideo } from '../../utils/fetchStreamingInfo';

const VideoPlayerContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const VideoPlayer = (props) => {
  const playerRef = useRef(null);
  const { guid } = useParams();
  const [videoInfo, setVideoInfo] = useState({ hlsUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' });

  useEffect(() => {
    const fetchVideoInfo = async () => {
      const res = await getVideo(guid);
      setVideoInfo(res);
    };
    fetchVideoInfo();
  }, [guid]);


  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      let qualityLevels = player.qualityLevels();

      qualityLevels.on('addqualitylevel', (event) => {
        let qualityLevel = event.qualityLevel;
        const supportedQualities = [270, 360, 720, 1080, 2160]; // 2160 for 4K

        if (supportedQualities.includes(qualityLevel.height)) {
          qualityLevel.enabled = true;
        } else {
          qualityLevel.enabled = false;
        }
      });

      qualityLevels.on('change', () => {
        console.log('Quality Level changed!');
        console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
      });
    }

    return () => {
      // No need to dispose the player in this case
    };
  }, [playerRef]);


  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    // plugins: {
    //   qualityControlPlugin: {} // Add any plugin options here
    // },
    sources: [
      {
        src: videoInfo.hlsUrl,
        type: 'application/x-mpegURL',
      },
    ],
    html5: {
      vhs: {
        withCredentials: false,
        enableLowInitialPlaylist: true,
        useDevicePixelRatio: true,
        useNetworkInformationApi: true,
      },
    },
  };


  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  return (
    <>
      <VideoPlayerContainer>
        <CustomVideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </VideoPlayerContainer>
    </>
  );

};

export default withAuth(VideoPlayer);;