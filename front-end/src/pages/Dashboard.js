import './Dashboard.css' 
import Header from '../components/Header' 
import Song from '../components/Song'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import axios from "axios"
import Grid from '@mui/material/Grid';
import CustomPopup from "./SongPopup"

const Dashboard = () => { 

    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    const [songs, setSongs] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => { 
        axios.get('https://my.api.mockaroo.com/songs.json?key=60fe9c50')
        .then (res => { 
            console.log(res.data)
            setSongs(res.data) 
        }) 
        .catch(err => { 
            console.log(err) 
        })
    }, [])

    return ( 
        <div> 
            <Header setSearch={setSearch}/> 
            <Typography component="h2" variant="h2" padding='20px' sx={{fontSize: '24px'}}>
                Current Top Hits 
            </Typography>
            <Grid container spacing = {4} justifyContent='center' padding='20px'> 
                {songs
                .filter(song => { 
                    if (song === '') return song; 
                    else if (song.title.toLowerCase().includes(search.toLowerCase())) return song; 
                    return ''; 
                })
                .map(song => { 
                    return (
                        <Grid onClick={e => setVisibility(!visibility)} item s={6} md ={4} lg ={3}>
                            <Song 
                                title = {song.title} 
                                cover = {song.cover} 
                                first_name = {song.first_name} 
                                last_name = {song.last_name} 
                            />
                        </Grid> 
                    ) 
                })}
            </Grid>
            <CustomPopup onClose={popupCloseHandler} show={visibility}>
        </CustomPopup>
        </div>
    )
}

export default Dashboard 