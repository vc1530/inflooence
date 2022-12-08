import './SavedSongs.css'
import { useState, useEffect } from 'react' 
import axios from 'axios' 
import { GoSearch } from 'react-icons/go'
import SongCard from '../song/SongCard'
import { Link } from 'react-router-dom' 

export default function SavedSongs () { 

    const token = localStorage.getItem('token')

    const [savedSongs, setSavedSongs] = useState([]) 
    const [search, setSearch] = useState('') 
    const [sid, setSid] = useState([]) 
    const [loggedIn, setLoggedIn] = useState(token!=''? true : false) 
    const [songs, setSongs] = useState([]) 
    const [flag, setFlag] = useState(0) 

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/allsongs`)
        .then(res=>setSongs(res.data.songs.map(song=>song._id))) 
        .catch(err=>console.log(err)) 

        axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs`, 
        { headers: { Authorization: `JWT ${token}`}}) 
        .then(res =>{ 
            setSid(res.data.saved_songs)
            if(flag==0) setFlag(1) 
            setLoggedIn(true) 
            sid.map((sid) => {
                axios.get(`${process.env.REACT_APP_BACKEND}/song/${sid}`) 
                .then(res => setSavedSongs(current => [...current, res.data.song]))
                .catch(err => console.log(err))
            })
        })
        .catch(err => { 
            setLoggedIn(false) 
            console.log(err)
        })

    }, [flag, loggedIn])

    const slideSearch = () => { 
        const searchBar = document.getElementById('searchBar') 
        searchBar.style.marginRight = '0px' 
    }

    const page = ( 
        <div id='savedSongs'> 
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
            {savedSongs
            .filter((song=> { 
                if (search==='') return song 
                else if (song.title.toLowerCase().includes(search.toLowerCase())) return song
                else if (song.artist.toLowerCase().includes(search.toLowerCase())) return song 
                return ''; 
            }))
            .sort((a, b) => songs.indexOf(a._id) - songs.indexOf(b._id))
            .map((song)=>
                <SongCard 
                    rank = {songs.indexOf(song._id) + 1} 
                    song = {song} 
                    savedSongs = {sid} 
                    loggedIn={loggedIn}
                /> 
            )}
        </div>
    )

    return savedSongs.length == 0 ? 
        <div id='none'>
            No saved songs yet.&nbsp;  
            <Link to='/'> 
            Click here
            </Link>
            &nbsp;to browse. 
        </div>
        : page
}