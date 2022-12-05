import Header from '../components/Header' 
import SongCard from '../dashboard/SongCard'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import axios from "axios"
import Grid from '@mui/material/Grid';
import CustomPopup from "../components/SongPopup"
import UserCard from '../components/UserCard' 
import jwt_decode from "jwt-decode"
import { Navigate } from 'react-router-dom' 

const SavedSongsList = (props) => { 

    const [songs, setSongs] = useState([])
    const [sid, setSid] = useState([])
    const [flag, setFlag] = useState(0)
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false) 

////// show list of songs saved by user - phoebus */

    useEffect(() => { 
        //********************** hardcoded user, need to validate if user has signed in yet */

        //            /allsavedsongs/:userid
        // gets you a list of song ids saved for each user

        const token = localStorage.getItem('token') 
        axios.get(`${process.env.REACT_APP_BACKEND}/user`, { 
            headers: { 
                Authorization: `JWT ${token}`
            }
        })
        .then(res=>
            { 
                setUser(res.data.user)
                setLoggedIn(true) 
            } ) 
        .catch(err=>{ 
            console.log(err)
            setLoggedIn(false) 
        })  

        axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs/${user._id}`) 
        .then(res =>{ 
            setSid(res.data.saved_songs)
            if(flag === 0){
                setFlag(1);
            }
            // map out sid array to make list of song objects
            sid.map((sid) =>{

                //     //******* */     /song/sid 
                //     // returns a song object for the songid sent

                axios.get(`${process.env.REACT_APP_BACKEND}/song/${sid}`) 
                .then(res =>{
                    setSongs(current => [...current, res.data.song]);
                })
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
    }, [flag, loggedIn])

    //placeholder 
    const search = '' 

    const page = ( 
        <>
        <div> 
            <Header /> 
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

    return loggedIn ? page : <Navigate to='/' />
}

export default SavedSongsList 