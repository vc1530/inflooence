import './Settings.css' 
import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'

export default function Settings ({ User, setLoggedIn }) { 

    // const token = localStorage.getItem('token') 

    const [user, setUser] = useState({})
    const [firstName, setFirstName] = useState('') 
    const [lastName, setLastName] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('') 

    useEffect(() => { 
        setUser(User)
        setFirstName(User.firstName) 
        setLastName(User.lastName) 
        setEmail(User.email) 
    }, [User])

    const handleSubmit = (e) => { 
        e.preventDefault() 
        const data = { 
            _id: user._id, 
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            password: password=='' && confirmPassword=='' ? user.password : password, 
        }
        axios.post(`${process.env.REACT_APP_BACKEND}/edit`, data)
        .then(res=>console.log(res.data.user)) 
        .catch(err=>console.log(err)) 
    }

    const navigate = useNavigate()

    const logOut = () => { 
        localStorage.clear(); 
        setLoggedIn(false) 
        navigate('/login') 
    }

    return ( 
        <div id='settings'>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
              sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 6
              }}
              >
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} className='settingsField'>
                      <span className='settingsLabel'>First Name</span> 
                      <TextField
                      autoComplete="given-name"
                      name="firstName"
                      value={firstName} 
                      onChange={e=>setFirstName(e.target.value)}
                      required
                      fullWidth
                      id="firstName"
                      autoFocus
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} className='settingsField'>
                    <span className='settingsLabel'>Last Name</span>
                      <TextField
                      required
                      fullWidth
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      value={lastName} 
                      onChange={e=>setLastName(e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={12} className='settingsField'>
                    <span className='settingsLabel'>Email Address</span>
                      <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={email} 
                      onChange={e=>setEmail(e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={12} className='settingsField'>
                    <span className='settingsLabel'>Password</span>
                      <TextField
                      required
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password} 
                      onChange={e=>setPassword(e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={12} className='settingsField'>
                    <span className='settingsLabel'>Confirm Password</span>
                      <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={confirmPassword} 
                      onChange={e=>setConfirmPassword(e.target.value)}
                      />
                  </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}> 
                    <Button
                    disabled={firstName=='' || lastName=='' || email=='' ||
                                (password !=confirmPassword)
                                ? true : false
                            }
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Save
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                  onClick={logOut}
                  variant="contained"
                  fullWidth
                  sx={{ 
                    backgroundColor: 'lightgray', 
                    color: 'gray', 
                    ":hover":{backgroundColor: 'darkgray'}, 
                    }}
                  >
                  Log out
                  </Button>
                </Grid>
                  <Grid container justifyContent="flex-end">
                  </Grid>
              </Box>
              </Box>
          </Container>
        </div>
    )
}