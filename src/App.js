import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddPage } from './pages/AddPage';
import './App.css';
import { BottomNavbar } from './components/BottomNavbar';
import { SettingPage } from './pages/SettingPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<HomePage />} />
      <Route path='/add-task' exact element={<AddPage />} />
      <Route path='/settings' exact element={<SettingPage />} />
    </Routes>
    <BottomNavbar />
    </BrowserRouter>
  );
}

export default App;
