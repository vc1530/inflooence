import './Dashboard.css' 
import Header from '../components/Header' 
import SongCard from './SongCard'
import { useEffect, useState } from 'react'
import axios from "axios"
import Grid from '@mui/material/Grid';
import Papa from 'papaparse'
import top250 from '../data/top-250-tiktokers.csv'
import LandingScreen from './LandingScreen';
import Body from './Body' 

const Dashboard = (props) => { 

    const [songs, setSongs] = useState([])
    const [tiktokers, setTiktokers] = useState([]) 

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_BACKEND}/allsongs`) 
        .then(res =>{ 
            setSongs(res.data.songs) 
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => { 
        Papa.parse(top250, {
            download: true, 
            skipEmptyLines: true,
            complete: function (results) {
            setTiktokers(results.data)
            },
        });
    }, [])

    useEffect(() => { 
        console.log(localStorage.getItem('token'))
        axios.get(`${process.env.REACT_APP_BACKEND}/user`, {
            headers: { Authorization: `JWT ${localStorage.getItem('token')}` } 
        })
        .then(res=>console.log(res)) 
        .catch(err=>console.log(err))
    }) 

    //placeholder
    const search = '' 

    return ( 
        <>
        <div className='Dashboard'> 
            <Header/> 
            <LandingScreen /> 
            <Body /> 
            {/* <Grid id='main' container spacing ={4} justifyContent='center' padding='20px'> 
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
                    <TestML></TestML>

                </Grid> 
                <Grid item xs={12} lg={6}>
                    <Typography component="h2" variant="h2" padding='20px' sx={{fontSize: '24px'}}>
                        Top TikTok Users
                    </Typography>
                    <Grid container justifyContent='center' padding='20px'> 
                        {tiktokers
                        .filter(tiktoker => { 
                            if (tiktokers === []) return tiktoker; 
                            else if (tiktoker[1].toLowerCase().includes(search.toLowerCase())) return tiktoker; 
                            return ''; 
                        })
                        .map(tiktoker => { 
                            return (
                                <Grid item xs = {12}>
                                    <UserCard 
                                        rank = {tiktoker[0]} 
                                        username = {tiktoker[1]} 
                                        country = {tiktoker[2]} 
                                        followers = {tiktoker[3]} 
                                        views = {tiktoker[4]} 
                                        likes = {tiktoker[5]} 
                                    />
                                </Grid> 
                            ) 
                        })}
                    </Grid>
                </Grid>
            </Grid> */}
            
        </div>
        </>

    )
}

export default Dashboard 