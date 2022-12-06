import './Body.css'
import { useState, useEffect } from 'react'  
import TopSongs from './TopSongs'
import Predictor from './Predictor'

export default function Body () { 

    const [choice, setChoice] = useState('topSongs') 

    const handleClick = (id) => { 
        const el = document.getElementById(id) 
        el.style.borderBottomStyle = 'solid'; 
        el.style.color = 'var(--accent-color)'
        let otherEl; 
        if (id === 'topSongsHeader') { 
            setChoice('topSongs') 
            otherEl = document.getElementById('predictorHeader') 
        } 
        else { 
            setChoice('predictor') 
            otherEl = document.getElementById('topSongsHeader') 
        } 
        otherEl.style.borderBottomStyle = 'none' 
        otherEl.style.color = 'gray' 
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    
    const scroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position)
        const header = document.getElementById('stickyHeader')
        const topSongsHeader = document.getElementById('topSongsHeader') 
        const predictorHeader = document.getElementById('predictorHeader')
        const bodyPos = document.getElementById('landing').offsetTop + document.getElementById('landing').offsetHeight - 95; 
        if (scrollPosition > bodyPos) {
            header.style.height = `30px`
            header.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            topSongsHeader.style.fontSize = `14pt`
            predictorHeader.style.fontSize = `14pt`
        } 
        else { 
            header.style.height = '100px'; 
            header.style.boxShadow = 'none'
            topSongsHeader.style.fontSize = '18pt' 
            predictorHeader.style.fontSize = '18pt' 
        } 
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('scroll', scroll);
        }
    }, [scrollPosition])

    return ( 
        <div id='main'> 
            <header id='stickyHeader' > 
                <h3 id='topSongsHeader' style={{color:'var(--accent-color)'}}onClick={()=>handleClick('topSongsHeader')}> 
                    Top Songs 
                </h3>
                <h3 id='predictorHeader' onClick={()=>handleClick('predictorHeader')}> 
                    Predictor 
                </h3>
            </header>
            <div className='Body'> 
                {choice == 'topSongs' ? <TopSongs /> : <Predictor />} 
            </div>
        </div> 
    )
}