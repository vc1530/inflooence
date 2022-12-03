import './LandingScreen.css' 
import { AiOutlineDown } from 'react-icons/ai'
import Icon from '../images/icon.gif'
import 'animate.css'

export default function LandingScreen () { 

    const handleScroll = () => { 
        const el = document.getElementById('main')
        console.log(el) 
        el.scrollIntoView({behavior: "smooth"}) 
    }

    return ( 
        <div id='landing' className='landingScreen'> 
            <div className='landingText'> 
                <div className='leftText' id='fadeHeader'> 
                    <h1> 
                        <span className='animate__animated animate__fadeInDown fadeText1'>Check out the </span>
                        <span className='animate__animated animate__fadeInDown fadeText2'>top trending </span>
                        <span className='animate__animated animate__fadeInDown fadeText3'>songs of TikTok </span>
                        <span className='animate__animated animate__fadeInDown fadeText4'>today </span>
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
                <h2 className='animate__animated animate__fadeIn fadeText5' onClick={handleScroll}> 
                    See below&ensp;
                    <AiOutlineDown /> 
                </h2>
            </div>
        </div>
    )
}