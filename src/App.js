import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Header } from './Components/Header';
import MyCollection from './Components/MyCollection';

// import "./styles/";
// import "bootstrap/scss/bootstrap";


export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={ <MyCollection /> } />
      </Routes>
    </BrowserRouter>
  );
}