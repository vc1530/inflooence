import './Login.css'
import * as React from 'react';
import {useState} from 'react'; 
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import Icon from '../images/icon.gif'
import CustomPopup from "./Popup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

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

export default function Login() {

  const navigate = useNavigate() 

  const [loggedIn, setLoggedIn] = useState(false)
  const [visibility, setVisibility] = useState(false) 

  const popupCloseHandler = (e) => {
      setVisibility(e);
  }

  //creates a jwt when user clicks sign in 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try { 
      const formData = { 
        email: data.get('email'), 
        password: data.get('password'), 
      }
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND}/login`, 
        formData
      )
      localStorage.setItem("token", res.data.token)
      setLoggedIn(true) 
    } catch (err) { 
      setLoggedIn(false) 
      console.log(err)
    } 
  }

  const page = (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://sm.mashable.com/t/mashable_sea/article/h/how-to-cre/how-to-create-your-own-custom-tiktok-audio_crtn.2496.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,              display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img id="tiktok-icon" src={Icon} alt="Icon" />
          <Typography sx={{fontSize: '24px'}}>
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '50%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent='center'>
              <Grid item m>
                <Link variant="body2" sx={{color: pink[500], fontSize: '11pt'}} onClick={e => setVisibility(!visibility)}>
                  {"Don't have an account? Sign Up"}
                </Link>
                <div id="signInDiv">
                </div>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
      <CustomPopup onClose={popupCloseHandler} show={visibility}>
      </CustomPopup>
    </Grid>
  ) 
    
  return loggedIn ? navigate('/') : page

}