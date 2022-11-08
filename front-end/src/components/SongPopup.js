import { useEffect, useState } from "react";
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";
import './Popup.css' 
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, pink } from '@mui/material/colors';

const theme = createTheme(
    {
        palette: {
          primary: {
            main: pink[500],
          },
          secondary: {
            main: purple[500],
          },
        },
        typography: {
            allVariants: {
              fontFamily: 'Nunito',
              textTransform: 'none',
              fontSize: 16,
            },
        },
      }, 
);

const CustomPopup = (props) => {

  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className= {popupStyles.overlay + ' SongPopup'}  
    >
      <div className={popupStyles.popup}>
        <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <img src = "https://dummyimage.com/100x100/000/fff" /> 
                    <h1> 
                        Midnight Rain 
                    </h1>
                    <h2> 
                        Taylor Swift 
                    </h2>
                    <p>Views: 1.5k</p>
                </Box>
            </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  name: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default CustomPopup;