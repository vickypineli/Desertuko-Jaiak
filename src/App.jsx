// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import app from './firebase/config';  
import { getApps } from 'firebase/app';
import Home from './pages/Home';

function App() {
  const apps = getApps();
  console.log('Firebase apps:', apps);
  console.log('Firebase app name:', app.name); // ✅ lo usa directamente
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Más rutas se añadirán luego: /eventos, /tienda, /contacto, /admin */}
      </Routes>
    </Router>
  );
}

export default App;

