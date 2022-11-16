import './Dashboard.css' 
import Header from '../components/Header' 
import SongCard from '../components/SongCard'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import axios from "axios"
import Grid from '@mui/material/Grid';
import CustomPopup from "../components/SongPopup"
import Papa from 'papaparse'
import db from '../data/db.csv'
import top250 from '../data/top-250-tiktokers.csv'
import UserCard from '../components/UserCard' 
import jwt_decode from "jwt-decode"

const Dashboard = (props) => { 

    const token = localStorage.getItem("token") 

    useEffect(() => { 
        const user = jwt_decode(token)
        console.log(user) 
    })

    const [songs, setSongs] = useState([])
    const [tiktokers, setTiktokers] = useState([]) 
    const [search, setSearch] = useState('')

    useEffect(() => { 
        Papa.parse(db, {
            download: true, 
            skipEmptyLines: true,
            complete: function (results) {
            console.log(results.data) 
            setSongs(results.data)
            },
        });
        Papa.parse(top250, {
            download: true, 
            skipEmptyLines: true,
            complete: function (results) {
            console.log(results.data.shift()) 
            setTiktokers(results.data)
            console.log(tiktokers) 
            },
        });
    }, [])


    return ( 
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
                            else if (song[0].toLowerCase().includes(search.toLowerCase())) return song; 
                            return ''; 
                        })
                        .map((song, i) => { 
                            return (
                                <Grid md ={6}>
                                    <SongCard 
                                        title = {song[0]} 
                                        cover = {song[10]} 
                                        artist = {song[1]} 
                                        id = {i + 1} 
                                    />
                                </Grid> 
                            ) 
                        })}
                    </Grid>
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
            </Grid>
        </div>
    )
}

export default Dashboard 