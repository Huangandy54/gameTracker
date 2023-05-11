import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import React, {useEffect , useMemo} from "react";
import { useSelector } from 'react-redux';
import {CssBaseline, ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { themeSettings } from './theme';

import HomePage from 'scenes/homePage';
import DetailsPage from 'scenes/detailsPage'
import PropTrackerPage from 'scenes/propPage'

const App = () => {
  const mode= useSelector((state)=>state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])

  return(
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/game/:gameID' element={<DetailsPage />} />
            <Route path='/Prop-Tracker' element={<PropTrackerPage />}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
