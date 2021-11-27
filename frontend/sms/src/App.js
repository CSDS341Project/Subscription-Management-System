import './App.css';
import * as React from 'react';
import LoginPage from './login';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <h1>
        Welcome to SMS
      <LoginPage />
      </h1>
    </div>
    
  );
}

export default App;
