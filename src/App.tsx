import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage/MainPage';
import { StoryPage } from './components/StoryPage/StoryPage';

function App() {
  return (
    <Routes >
      <Route path="/" element={<MainPage />} />
      <Route path='story/:id' element={<StoryPage />}/>
    </Routes>
  );
}

export default App;
