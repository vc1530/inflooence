import './SongMessage.css' 
import check from '../images/check.png' 
import { Link } from 'react-router-dom'

const SongMessage = ({song, add, visibility, setVisibility}) => ( 
    <div 
        style={{
            visibility: visibility ? "visible" : "hidden",
        }}
        className={`animate__animated songMessage ${visibility ? 'in' : 'out'}`}
        onTransitionEnd={() => setVisibility(false)} 
    >
        <img src={check} alt='check' className='songCheck'/> 
        <div> 
            {add ? 'Removed ' : 'Added '}
            <Link to={`/${song._id}`} className='songLink'>{song.title}</Link>
            {add ? ' from ' : ' to '} 
              Saved Songs! 
        </div>
    </div>
  )

  export default SongMessage 