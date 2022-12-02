import './LandingScreen.css' 
import { AiOutlineDown } from 'react-icons/ai'
import Icon from '../images/icon.gif'

export default function LandingScreen () { 

    const handleScroll = () => { 
        const el = document.getElementById('main')
        console.log(el) 
        el.scrollIntoView({behavior: "smooth"}) 
    }

    return ( 
        <div className='landingScreen'> 
            <div className='landingText'> 
                <div className='leftText'> 
                    <h1> 
                        Check out the top trending songs of TikTok today
                    </h1>
                </div>
                <div className='rightText'>
                    <img id="tiktok-icon" src={Icon} alt="Icon" />
                    <div> 
                        Predict upcoming trending songs with our machine 
                        learning model using data from TikTok and Spotify. 
                    </div>
                </div>
            </div>
            <div className='leftText'> 
                <h2 onClick={handleScroll}> 
                    See below&ensp;
                    <AiOutlineDown /> 
                </h2>
            </div>
        </div>
    )
}