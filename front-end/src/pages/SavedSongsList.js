import './Dashboard.css' 
import Header from '../components/Header' 
import SongCard from '../components/SongCard'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import axios from "axios"
import Grid from '@mui/material/Grid';
import CustomPopup from "../components/SongPopup"
import UserCard from '../components/UserCard' 
import jwt_decode from "jwt-decode"

const SavedSongsList = (props) => { 

    const [songs, setSongs] = useState([])
    const [sid, setSid] = useState([])
    const [search, setSearch] = useState('')

//////**************************************************************** - phoebus */

    // console.log("songs: ", songs);
    // console.log("sid: ", sid);

    // this gets you list of song ids
    useEffect(() => { 
        //********************** hardcoded user, need to validate if user has signed in yet */
        axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs/638672dfe7e787c5ead8774c`) 
        .then(res =>{ 
            setSid(res.data.saved_songs) 
        })
        .catch(err => console.log(err))
    }, [])

    // now i need to create a list of song objects to display on the website
    useEffect(() => { 
        //********************** hardcoded user, need to validate if user has signed in yet */

        sid.map((sid) =>{
            axios.get(`${process.env.REACT_APP_BACKEND}/song/${sid}`) 
            .then(res =>{
                setSongs(current => [...current, res.data.song]);
            })
            .catch(err => console.log(err))
        })
    }, [sid])

// current bug: each songid is being added to list of song objects twice
//////**************************************************************** - phoebus */


    // const test = async() => {
    //     // declare the data fetching function
    //     const fetchData = async () => {
    //       const res = await axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs/638672dfe7e787c5ead8774c`);
    //       res.data.saved_songs.map((sid) =>{
    //         axios.get(`${process.env.REACT_APP_BACKEND}/song/${sid}`) 
    //         .then(res =>{
    //             setSongs(current => [...current, res.data.song]);
    //         })
    //         .catch(err => console.log(err));

    //     })



    return ( 
        <>
        <div> 
            <Header setSearch={setSearch}/> 
            <Grid container spacing ={4} justifyContent='center' padding='20px'> 
                <Grid item xs={12} md={6}>
                    <Typography component="h2" variant="h2" padding='20px' sx={{fontSize: '24px'}}>
                        Current Top Hits 
                    </Typography>
                    <Grid container spacing={4} justifyContent='center' padding='20px'> 
                        {songs
                        .filter(song => { 
                            if (song === []) return song; 
                            else if (song.title.toLowerCase().includes(search.toLowerCase())) return song; 
                            return ''; 
                        })
                        .map((song, i) => { 
                            return (
                                <Grid md ={6}>
                                    <SongCard 
                                        title = {song.title} 
                                        cover = {song.url} 
                                        artist = {song.artist} 
                                        id = {song._id} 
                                        rank = {i + 1}
                                        // NEED TO VALIDATE IF USER IS SIGNED IN
                                        user = "638672dfe7e787c5ead8774c" 
                                    />
                                </Grid> 
                            ) 
                        })}
                    </Grid>

                </Grid> 
            
            </Grid>
            
        </div>
        </>

    )
}

export default SavedSongsList 