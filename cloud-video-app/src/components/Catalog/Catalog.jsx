import withAuth from '../withAuth';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { getAllVideos } from '../../utils/fetchStreamingInfo';

const StyledContainer = styled(Grid)`
    padding: 16px;
    background-color: inherit;
`;

const StyledTitle = styled(Typography)`
    color: white;
`;

const StyledCard = styled(Card)`
    margin: 16px;
    background-color: inherit;
    transition: transform 0.3s;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`;

const StyledCardMedia = styled(CardMedia)({
    height: 200,
});

const VideoCatalog = () => {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchVideos = async () => {
            const videoData = await getAllVideos();
            const videoList = videoData.map(({ guid, filename, thumbnails }) => {
                return {
                    guid,
                    title: filename,
                    thumbnail: thumbnails[0] || `/assets/vdo-thumbnail.png`,
                };
            });
            setVideos(videoList);
        };
        fetchVideos();
    }, []);

    const handleVideoClick = async (guid) => {
        navigate(`/play/${guid}`);
    };

    return (
        <StyledContainer container spacing={3}>
            {videos.map(({ guid, title, thumbnail }) => (
                <Grid item xs={4} key={guid}>
                    <StyledCard onClick={() => handleVideoClick(guid)}>
                        <CardActionArea>
                            <StyledCardMedia image={thumbnail} title={title} />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" style={{ color: 'white' }}>
                                    <StyledTitle gutterBottom variant="h6" component="div">
                                        {title}
                                    </StyledTitle>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </StyledCard>
                </Grid>
            ))}
        </StyledContainer>
    );
};

export default withAuth(VideoCatalog);
