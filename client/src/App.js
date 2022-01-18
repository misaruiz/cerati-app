import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';

// import "./styles/";
// import "bootstrap/scss/bootstrap";
// import { config } from './config';

// const headers = {
//   Authorization: `Discogs key=${config.consumerKey}, secret=${config.consumerSecret}`,
// };
// const reqInfo = { config, username, headers }

export default function App() {

  return (
    <BrowserRouter>
      <Profile />
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
      </Routes>
    </BrowserRouter>
  );
}