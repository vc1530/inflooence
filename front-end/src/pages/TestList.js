import React from 'react';
import axios from 'axios';

import './Dashboard.css' 
import Header from '../components/Header' 
import SongCard from '../components/SongCard'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomPopup from "../components/SongPopup"
import Papa from 'papaparse'
import db from '../data/db.csv'
import top250 from '../data/top-250-tiktokers.csv'
import UserCard from '../components/UserCard' 


export default function App() {

  const[songs, setSongs] = useState([])

  React.useEffect(() => {
    axios.get(`http://localhost:8888/allsongs`).then((response) => {
      setSongs(response.data);
    });
  }, []);

  if (!songs) return null;
  return (
    // console.log(songs[0])
    // console.log(typeof(songs))
    // console.log({songs.map(song => song.artist)})
    // {songs[0].map(block => block.component)}
    // <div>
    //   {song}
    //   <h1>{song.title}</h1>
    //   <p>{song.body}</p>
    //   please
    // // </div>
    <div> 
      <Grid container spacing ={4} justifyContent='center' padding='20px'> 
          <Grid item xs={12} md={6}>
              <Typography component="h2" variant="h2" padding='20px' sx={{fontSize: '24px'}}>
                  Current Top Hits 
              </Typography>
              <Grid container spacing={4} justifyContent='center' padding='20px'> 
                  {songs
                  // .filter(songs => { 
                  //     if (songs === []) return songs; 
                  //     return ''; 
                  // })
                  .map((song, i) => { 
                      return (
                          <Grid md ={6}>
                              <SongCard 
                                  title = {song.title} 
                                  cover = {song.url} 
                                  artist = {song.artist} 
                                  id = {i + 1} 
                              />
                          </Grid> 
                        ) 
                  })}
              </Grid>
          </Grid>
      </Grid> 
    </div>
  )
}

// export default class Test extends React.Component {
//     state = {
//       songs: []
//     }
  
//     componentDidMount() {
//       axios.get(`http://localhost/8888/getAllSongs`)
//         .then(res => {
//           const songs = res.data;
//           this.setState({ songs });
//         })
//     }
  
//     render() {
//       return (
//         <ul>
//           {
//             this.state.songs
//               .map(song =>
//                 <li key={song.id}>{song.title}</li>
//               )
//           }
//           haha
//         </ul>
//       )
//     }
//   }