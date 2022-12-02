import './Body.css'

export default function Body () { 

    const handleClick = (id) => { 
        const el = document.getElementById(id) 
        el.style.borderBottomStyle = 'solid'; 
        el.style.color = 'var(--accent-color)'
        let otherEl; 
        if (id === 'topSongsHeader') otherEl = document.getElementById('predictorHeader') 
        else otherEl = document.getElementById('topSongsHeader') 
        otherEl.style.borderBottomStyle = 'none' 
        otherEl.style.color = 'gray' 
    }

    const topSongs = ( 
        <div id='topSongs'> 
            <header> 
                <span> 
                    Rank 
                </span>
                <span> 
                    Title
                </span>
                <span> 
                    Artist 
                </span>
                <span> 
                    +
                </span>
            </header>
        </div>
    )

    return ( 
        <div className='Body'> 
            <header> 
                <h3 id='topSongsHeader' onClick={()=>handleClick('topSongsHeader')}> 
                    Top Songs 
                </h3>
                <h3 id='predictorHeader' onClick={()=>handleClick('predictorHeader')}> 
                    Predictor 
                </h3>
            </header>
            {topSongs} 
        </div>
    )
}