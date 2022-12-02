import Header from '../components/Header'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom' 
import BarGraph from '../components/BarGraph' 
import axios from 'axios' 
import Grid from '@mui/material/Grid';
import no_url from '../images/no_url.png'

const Song = (props) => { 

    const [song, setSong] = useState({})

    let params = useParams();

    //get song from the database 
    useEffect(() => { 
        axios
        .get(`${process.env.REACT_APP_BACKEND}/${params.id}`)
        .then(res => setSong(res.data.song)) 
        .catch(err => console.log(err)) 
    }, [params.id])

    return ( 
        <div> 
            <Header /> 
            <Grid container spacing = {4} justifyContent='center' padding='20px' > 
                <Grid item xs={6}> 
                    <img src={song.url === 'no_url' ? no_url : song.url} alt='cover'/> 
                    <h1>{song.title}</h1>
                    <h2>{song.artist}</h2>
                </Grid>
                <Grid item xs={6}>
                    <BarGraph 
                        song = {song} 
                    /> 
                </Grid>
            </Grid>
        </div>
    )
}

export default Song 
