import './TopSongs.css'
import SongCard from './SongCard' 
import axios from 'axios' 
import { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import jwt_decode from 'jwt-decode'

export default function TopSongs () { 

    const [songs, setSongs] = useState([]) 
    const [search, setSearch] = useState('') 
    const [savedSongs, setSavedSongs] = useState([])

    const token = localStorage.getItem('token') 

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_BACKEND}/allsongs`)
        .then(res=>setSongs(res.data.songs)) 
        .catch(err=>console.log(err)) 

        axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs`, { 
            headers: {Authorization : `JWT ${token}`} 
          }) 
          .then(res=>setSavedSongs(res.data.saved_songs)) 
          .catch(err=>console.log(err))
    }, [])

    const slideSearch = () => { 
        const searchBar = document.getElementById('searchBar') 
        searchBar.style.marginRight = '0px' 
    }

    return ( 
        <div id='topSongs'> 
            <div className='search'> 
                <input
                    id='searchBar' 
                    type="text"
                    placeholder="Search here"
                    onChange={e=>setSearch(e.target.value)}
                    value={search} />
                <GoSearch size='28px' id='searchIcon' onClick={slideSearch} />  
            </div>
            <header> 
                <span className='rank'> 
                    Rank 
                </span>
                <span className='title'> 
                    Title
                </span>
                <span className='artist'> 
                    Artist 
                </span>
            </header>
            {songs
            .filter((song=> { 
                if (search==='') return song 
                else if (song.title.toLowerCase().includes(search.toLowerCase())) return song
                else if (song.artist.toLowerCase().includes(search.toLowerCase())) return song 
                return ''; 
            }))
            .map((song, i)=>
                <SongCard 
                    rank = {i+1} 
                    song = {song} 
                    savedSongs = {savedSongs} 
                /> 
            )}
        </div>
    )
}