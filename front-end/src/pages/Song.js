import Header from '../components/Header'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom' 
import BarGraph from '../components/BarGraph' 
import axios from 'axios' 
import Grid from '@mui/material/Grid';

const Song = (props) => { 

    const [song, setSong] = useState({})
    const [search, setSearch] = useState('')

    let params = useParams();

    useEffect(()=> { 
        axios.get('https://my.api.mockaroo.com/songs.json?key=60fe9c50')
        .then (res => { 
            console.log(props)
            setSong(res.data.find(song => {
                if (song.id == params.id) return song 
                return '' 
            })) 
        }) 
        .catch(err => { 
            console.log(err) 
        })
        if (search !== '') window.location.replace('/dashboard')
    }, [search, params.id])

    return ( 
        <div> 
            <Header setSearch={setSearch} /> 
            <Grid container spacing = {4} justifyContent='center' padding='20px' > 
                <Grid item xs={6}> 
                    <img src={song.cover} /> 
                    <h1>{song.title}</h1>
                    <h2>{song.first_name} {song.last_name}</h2>
                </Grid>
                <Grid item xs={6}>
                    <BarGraph 
                        title={song.title} 
                        acousticness={song.acousticness} 
                        energy={song.energy} 
                        liveness={song.liveness} 
                        loudness={song.loudness} 
                        tempo={song.tempo} 
                    /> 
                </Grid>
            </Grid>
        </div>
    )
}

export default Song 
