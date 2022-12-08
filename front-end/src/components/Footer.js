import './Footer.css' 
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Inflooence
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  } 

const Footer = () => { 
    return ( 
        <div className='Footer'> 
            <Copyright />
        </div>
    )
}

export default Footer 