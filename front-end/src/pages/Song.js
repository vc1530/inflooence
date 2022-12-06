import Header from '../components/Header'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom' 
import axios from 'axios' 
import './Song.css'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { Popup } from 'semantic-ui-react'
import "semantic-ui-css/components/popup.min.css"
import SongMessage from '../dashboard/SongMessage' 

const DataDiv = ({name, description, val, min, max}) => { 

    const style = { 
        color:'var(--accent-color)', 
        boxShadow:'none'
    }

    const minVal = parseFloat(min), maxVal = parseFloat(max) 

    return ( 
        <div className={`analyticsDiv ${name}Div`}> 
            <span className={`label ${name}`}> 
                {name}
                <Popup 
                    content={description} 
                    trigger={<span className='questionIcon'><AiFillQuestionCircle /> </span>} 
                    size='mini'
                /> 
            </span>
            <div className='display'>
                {min}
                <div className={`analyticsBox ${name==='Loudness'?'loudnessBox': ''}`}>
                    <Popup 
                        content={val} 
                        trigger={
                            <div 
                                className={`analyticsBar ${name==='Loudness'?'loudnessBar': ''}`}
                                style={{width:`${Math.abs(val/(name==='Loudness' ? minVal : maxVal)) * 510}px`}}
                            >
                            </div>
                        }
                        position={name==='Loudness'? 'top left' : 'top right'}
                        style={style}
                        size='mini'
                    />
                </div>
                {max} 
            </div>
        </div>
    )
} 

const Song = () => { 

    let params = useParams()

    const [song, setSong] = useState({})
    const [savedSongs, setSavedSongs] = useState([]) 
    const [add, setAdd] = useState(savedSongs.indexOf(params.id)==-1) 
    const [visibility, setVisibility] = useState(false)

    const token = localStorage.getItem('token') 

    //get song from the database 
    useEffect(() => { 
        window.scrollTo(0, 0)

        axios
            .get(`${process.env.REACT_APP_BACKEND}/song/${params.id}`)
            .then(res => setSong(res.data.song))
            .catch(err=>console.log(err))
        axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs`, { 
                headers: {Authorization : `JWT ${token}`} 
            }) 
            .then(res=>{ 
                setSavedSongs(res.data.saved_songs)
                setAdd(res.data.saved_songs.indexOf(params.id)==-1)
            }) 
            .catch(err=>console.log(err))

    }, [params.id])

    // useEffect(() => { 
    //     axios.get(`${process.env.REACT_APP_BACKEND}/allsavedsongs`, { 
    //         headers: {Authorization : `JWT ${token}`} 
    //     }) 
    //     .then(res=>{ 
    //         setSavedSongs(res.data.saved_songs)
    //         setAdd(res.data.saved_songs.indexOf(song._id)==-1)
    //         console.log(res.data.saved_songs)
    //         console.log(song._id)
    //         console.log(res.data.saved_songs.indexOf(song._id))
    //     }) 
    //     .catch(err=>console.log(err))
    // }, [])

    const handleSong = () => { 
        setVisibility(true) 
        const button = document.getElementById('saveSong')
        if (add) { 
          axios.get(`${process.env.REACT_APP_BACKEND}/savesong/${song._id}`, {
            headers: {Authorization: `JWT ${token}`}, 
          })
          .then(res=>{ 
            setSavedSongs(res.data.savedSongs)
          } )
          .catch(err=>console.log(err))
          setAdd(false) 
          button.classList.add('saved')
          button.classList.remove('saveThisSong')
        }
        else { 
          axios.get(`${process.env.REACT_APP_BACKEND}/removesong/${song._id}`, {
            headers: {Authorization: `JWT ${token}`}, 
          })
          .then(res=>setSavedSongs(res.data.savedSongs))
          .catch(err=>console.log(err))
          setAdd(true) 
          button.classList.add('saveThisSong')
          button.classList.remove('saved') 
        }
      }

    const handleScroll = () => { 
        const el = document.getElementById('analytics')
        el.scrollIntoView({behavior: "smooth"}) 
    }

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('scroll', scroll);
        }
    }, [scrollPosition])

    const scroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position)
        const albumCover = document.getElementById('albumCover')
        const seeAnalytics = document.getElementById('seeAnalytics') 
        const h1 = document.getElementById('h1') 
        const h2 = document.getElementById('h2') 
        const titleArtist = document.getElementById('titleArtist') 
        if (scrollPosition> 25) {
            albumCover.style.height = '75px' 
            seeAnalytics.innerHTML = '' 
            h1.style.fontSize = '18pt' 
            h2.style.fontSize = '16pt' 
            titleArtist.style.flexDirection = 'row' 
        } 
        else { 
            albumCover.style.height = '175px'
            seeAnalytics.innerHTML = `See Analytics&ensp;`
            h1.style.fontSize = '28pt' 
            h2.style.fontSize = '26pt' 
            titleArtist.style.flexDirection = 'column' 
        } 
    }

    return ( 
        <>
        <Header /> 
        <div className='Song'> 
            <div id='songPageHeader'> 
                <img id='albumCover' src={song.url !== 'no_url' ? song.url : ''}/>
                <div id='titleArtist'> 
                    <div id='headers'> 
                        <h1 id='h1' className='songTitle'>{song.title}</h1>
                        <h2 id='h2' className='songArtist'>{song.artist}</h2>
                    </div>
                    <div> 
                        <button onClick={handleSong} id='saveSong' className={`${add ? 'saveThisSong' : 'saved'}`}>
                            {add ? 'Save Song' : 'Saved!'}
                        </button>
                        <span onClick={handleScroll} id='seeAnalytics'>
                            See Analytics&ensp;
                        </span>
                    </div>
                </div>
            </div>
            <div id='analytics'> 
                <DataDiv 
                    name='Acousticness'
                    description='A confidence measure from 
                    0.0 to 1.0 of whether the track is acoustic.
                    1.0 represents high confidence the track 
                    is acoustic.'
                    val={song.ac} 
                    min={'0.0'} 
                    max={'1.0'}
                /> 
                <DataDiv 
                    name='Danceability'
                    description='Describes how suitable a
                     track is for dancing based on a
                      combination of musical elements 
                      including tempo, rhythm stability, 
                      beat strength, and overall regularity.'
                    val={song.dance} 
                    min={'0.0'} 
                    max={'1.0'}
                />
                <DataDiv 
                    name='Energy' 
                    description='Energy is a measure from
                     0.0 to 1.0 and represents a perceptual 
                     measure of intensity and activity. 
                     Typically, energetic tracks feel fast, loud, and noisy.'
                    val={song.energy} 
                    min={'0.0'} 
                    max={'1.0'} 
                />
                <DataDiv 
                    name='Liveness' 
                    description='Detects the presence of 
                    an audience in the recording. Higher 
                    liveness values represent an increased 
                    probability that the track was performed
                     live. A value above 0.8 provides strong
                      likelihood that the track is live.
                    '
                    val={song.liveness} 
                    min={'0.0'} 
                    max={'1.0'} 
                />
                <DataDiv 
                    name='Tempo' 
                    description='The overall estimated 
                    tempo of a track in beats per minute 
                    (BPM). In musical terminology, tempo 
                    is the speed or pace of a given piece 
                    and derives directly from the average 
                    beat duration.'
                    val={song.tempo} 
                    min={'0.0'} 
                    max={'200.0'} 
                />
                <DataDiv
                    name='Loudness' 
                    description='Overall loudness of a 
                    track in decibels (dB). Loudness values 
                    are averaged across the entire track 
                    and are useful for comparing relative 
                    loudness of tracks. Values 
                    typical range between -60 and 0 dB.'
                    val={song.loudness} 
                    min={'-60.0'} 
                    max={'0.0'} 
                />
            </div>
        </div>
        <SongMessage song={song} add={add} visibility={visibility} setVisibility={setVisibility}/> 
        </>
    )
}

export default Song 
