import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard' 
import Profile from './pages/Profile' 
import Song from './pages/Song'
import SavedSongsList from './pages/SavedSongsList'
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, pink } from '@mui/material/colors';
import axios from "axios"
import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import TestML from './pages/TestML'

const theme = createTheme(
  {
      palette: {
        primary: {
          main: pink[400],
        },
        secondary: {
          main: green[500],
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

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} /> 
              <Route path="/profile" element={<Profile />} /> 
              <Route path="/:id" element={<Song />} /> 
              <Route path="/test" element={<TestML />} />
              <Route path="/viewsavedsongs" element={<SavedSongsList />} /> 


            </Routes> 
          </main>
        </Router>
      </ThemeProvider>
    </div>

  );
}

export default App;
