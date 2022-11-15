import Header from '../components/Header'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom' 
import BarGraph from '../components/BarGraph' 
import axios from 'axios' 
import Grid from '@mui/material/Grid';
import db from '../data/db.csv'
import Papa from 'papaparse'
import no_url from '../images/no_url.png'

const Song = (props) => { 

    const [song, setSong] = useState({})
    const [search, setSearch] = useState('')

    let params = useParams();

    useEffect(()=> { 
        Papa.parse(db, {
            download: true, 
            skipEmptyLines: true,
            complete: function (results) {
            setSong(results.data.find((song, i) => i+1 == params.id))  
        }});
        if (search !== '') window.location.replace('/dashboard')
    }, [search])

    console.log(song) 

    return ( 
        <div> 
            <Header setSearch={setSearch} /> 
            <Grid container spacing = {4} justifyContent='center' padding='20px' > 
                <Grid item xs={6}> 
                    <img src={song[10] == "no_url" ? no_url : song[10]} /> 
                    <h1>{song[0]}</h1>
                    <h2>{song[1]}</h2>
                </Grid>
                <Grid item xs={6}>
                    <BarGraph 
                        title={song[0]} 
                        
                        acousticness={+song[3]} 
                        energy={+song[4]} 
                        liveness={+song[5]} 
                        loudness={+song[6]} 
                        tempo={0.1} 
                    /> 
                </Grid>
            </Grid>
        </div>
    )
}

export default Song 
