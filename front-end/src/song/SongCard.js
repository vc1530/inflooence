import './SongCard.css'
import { useState, useEffect } from 'react' 
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'
import SongMessage from './SongMessage' 
import { PromiseProvider } from 'mongoose'

export default function SongCard ({rank, song, savedSongs, loggedIn}) { 

  const [add, setAdd] = useState(savedSongs.indexOf(song._id)==-1)
  const [visibility, setVisibility] = useState(false) 

  useEffect(() => { 
    setAdd(savedSongs.indexOf(song._id)==-1)
  }, [savedSongs]) 

  const token = localStorage.getItem('token') 

  const handleSong = async () => { 
    setVisibility(true) 
    const button = document.getElementById(`addButton${rank}`)
    if (add) { 
      axios.get(`${process.env.REACT_APP_BACKEND}/savesong/${song._id}`, {
        headers: {Authorization: `JWT ${token}`}, 
      })
      .catch(err=>console.log(err))
      setAdd(false) 
      button.classList.remove('plus') 
      button.classList.add('minus')
    }
    else { 
      axios.get(`${process.env.REACT_APP_BACKEND}/removesong/${song._id}`, {
        headers: {Authorization: `JWT ${token}`}, 
      })
      .catch(err=>console.log(err))
      setAdd(true) 
      button.classList.remove('minus') 
      button.classList.add('plus')
    }
  }

  const navigate = useNavigate() 

  const handleClick = () => { 
    navigate(`/${song._id}`)
  }

  return ( 
    <>
      <div className='SongCard'> 
        <span className='rank'> 
          <b>{rank}</b>
        </span>
        <span className='title'> 
          {song.url != 'no_url' ? <img className='songCover' src = {song.url} alt='cover' /> : ''} 
          <span onClick={handleClick}><b>{song.title}</b></span> 
        </span>
        <span className='artist'> 
          {song.artist}
        </span>
        <span className='add'>
          {loggedIn ?
            <button id={`addButton${rank}`} className={`addButton ${add ? 'plus' : 'minus'}`} onClick={handleSong}> 
              {add ? '+' : '-'}
            </button> : 
            '' 
          }
        </span>
      </div>
      <SongMessage song={song} add={add} visibility={visibility} setVisibility={setVisibility}/>
    </>
  )
}