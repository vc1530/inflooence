import './SongCard.css' 
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
import Link from '@mui/material/Link';
import no_url from '../images/no_url.png'
import { useState, useEffect } from 'react';
import axios from "axios"
import {useParams} from 'react-router-dom' 


const Song = props => {
  const [savedSongs, setSavedSongs] = useState(0);
  const theme = useTheme();
  // console.log(props) 
  // console.log("user", props.user);


  return (
    <>
    <Card className = 'Song'>
      <span className = "song-id">{props.rank}</span>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 160, }}>
        <CardContent sx={{ flex: '1 0 auto', overflow: 'scroll', height: '70px' }}>
          <Typography className="song-title" component="div" variant="h5">
            <Link href={"/" + props.id}>{props.title}</Link>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.artist} 
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
        image={props.cover == "no_url" ? no_url : props.cover} 
        alt="Album cover"
      />
    </Card>
    <button onClick={() => 
      axios.get(`${process.env.REACT_APP_BACKEND}/savesong/${props.user}/${props.id}`) 
      .then(res =>{ 
          // setSongs(res.data.songs) 
      })
      .catch(err => console.log(err))
    }>SAVE SONG</button>

    </>
  );
}  

export default Song 