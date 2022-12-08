import './Profile.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react' 
import SavedSongs from './SavedSongs'
import Settings from './Settings'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom' 

export default function Profile () { 

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const [loggedIn, setLoggedIn] = useState(token?true:false) 
    const [user, setUser] = useState({})
    const [choice, setChoice] = useState('savedSongs')
    
    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_BACKEND}/user`, 
        {headers: {Authorization: `JWT ${token}`}})
        .then(res=>{ 
            setLoggedIn(true) 
            setUser(res.data.user) 
        }) 
        .catch(err=>{ 
            setLoggedIn(false) 
            console.log(err)
            navigate('/login')
        })
    }, [loggedIn])

    const handleClick = (id) => { 
        const savedSongs = document.getElementById('savedSongsHeader') 
        const settings = document.getElementById('settingsHeader') 
        if (id === 'savedSongsHeader') { 
            savedSongs.style.color='var(--accent-color)'
            savedSongs.style.borderBottomStyle = 'solid'
            settings.style.color='grey'
            settings.style.borderBottomStyle = 'none'; 
            setChoice('savedSongs') 
        }
        else { 
            settings.style.color='var(--accent-color)'
            settings.style.borderBottomStyle = 'solid'
            savedSongs.style.color='grey'
            savedSongs.style.borderBottomStyle = 'none'
            setChoice('settings') 
        }
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    
    const scroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position)
        const header = document.getElementById('profileHeader')
        const savedSongsHeader = document.getElementById('savedSongsHeader') 
        const settingsHeader = document.getElementById('settingsHeader')
        if (scrollPosition > 20) {
            header.style.height = `75px`
            header.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            savedSongsHeader.style.fontSize = `14pt`
            settingsHeader.style.fontSize = `14pt`
        } 
        else { 
            header.style.height = '100px'; 
            header.style.boxShadow = 'none'
            savedSongsHeader.style.fontSize = '18pt' 
            settingsHeader.style.fontSize = '18pt' 
        } 
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('scroll', scroll);
        }
    }, [scrollPosition])

    const page = ( 
        <div className='profile'> 
            <Header id='headerNow' /> 
            <div id='profileHeader'>
                <h3 id='savedSongsHeader' style={{color:'var(--accent-color)', borderBottomStyle:'solid'}} onClick={()=>handleClick('savedSongsHeader')}> 
                    Saved Songs
                </h3>
                <h3 id='settingsHeader' onClick={()=>handleClick('settingsHeader')}> 
                    Settings 
                </h3>
            </div>
            <div id='body'> 
                {choice == 'savedSongs' ? <SavedSongs /> : <Settings User={user} setLoggedIn={setLoggedIn} />} 
            </div>
            <Footer /> 
        </div>  
    )

    return loggedIn ? page : navigate('/login') 
}
