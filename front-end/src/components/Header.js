import { Link, useNavigate } from 'react-router-dom'
import './Header.css' 

export default function Header () {

  const navigate = useNavigate();
  return ( 
    <div className = 'Header'> 
      <Link to='/'>
        <h2> 
          INFLOOENCE
        </h2>
      </Link>
      <div className = 'Side'> 
        <button onClick={()=>navigate('/login')}>
          Log in
        </button>
        <button> 
          Sidebar
        </button>
      </div>
    </div>
  )
}