import './TopSongs.css'
import SongCard from '../song/SongCard' 
import axios from 'axios' 
import { useState, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import jwt_decode from 'jwt-decode'
import ClipLoader from 'react-spinners/ClipLoader';


export default function TopSongs () { 

    const [songs, setSongs] = useState([]) 
    const [search, setSearch] = useState('') 
    const [savedSongs, setSavedSongs] = useState([])
    const [loggedIn, setLoggedIn] = useState(false) 
    const [loaded, setLoaded] = useState(false)

    const token = localStorage.getItem('token') 

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_BACKEND}/allsongs`)
        .then(res=>setSongs(res.data.songs)) 
        .catch(err=>console.log(err)) 

        axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs`, { 
            headers: {Authorization : `JWT ${token}`} 
          }) 
          .then(res=>{ 
            setLoggedIn(true) 
            setSavedSongs(res.data.saved_songs)
            setLoaded(true)
          }) 
          .catch(err=>{
            setLoggedIn(false) 
            console.log(err)
            // ******* note: if you test on local you should uncomment this, it'll never load properly on local because our frontend on our server is on netlify
            // setLoaded(true)
          })
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

            {/* see above ************* comment for loading screen */}
            {!loaded ? (<ClipLoader color="#ff0050" size={100}/>) : ''}

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
                    loggedIn={loggedIn} 
                /> 
            )}
        </div>
    )
}