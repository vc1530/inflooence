import './Song.css' 
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';

const Song = props => {
  const theme = useTheme();
  return (
    <Card className = 'Song'>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 180, }}>
        <CardContent sx={{ flex: '1 0 auto', overflow: 'scroll', height: '70px' }}>
          <Typography component="div" variant="h5">
            {props.title} 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.first_name} {props.last_name} 
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        image={props.cover} 
        alt="Album cover"
      />
    </Card>
  );
}  

export default Song 