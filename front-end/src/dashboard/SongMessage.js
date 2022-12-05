import './SongMessage.css' 
import check from '../images/check.png' 

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
            <span className='songLink'>{song.title}</span>
            {add ? ' from ' : ' to '} 
              Saved Songs! 
        </div>
    </div>
  )

  export default SongMessage 