import './Dashboard.css' 
import Header from '../components/Header' 
import LandingScreen from './LandingScreen';
import Body from './Body' 
import Footer from '../components/Footer'

const Dashboard = () => { 

    return ( 
        <div className='Dashboard'> 
            <Header/> 
            <LandingScreen /> 
            <Body /> 
            <Footer /> 
        </div>
    )
}

export default Dashboard 