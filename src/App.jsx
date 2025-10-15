// src/App.jsx
import React from 'react';
import app from './firebase/config';  
import { getApps } from 'firebase/app';

function App() {
  const apps = getApps();
  console.log('Firebase apps:', apps);
  console.log('Firebase app name:', app.name); // ✅ lo usa directamente
  

  return (
    <div className="app">
      <h1>Desertuko Jaiak</h1>
      <p>Firebase conectado correctamente ✅</p>
    </div>
  );
}

export default App;

