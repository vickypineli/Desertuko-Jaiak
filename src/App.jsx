// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageProvider';
import app from './firebase/config';  
import { getApps } from 'firebase/app';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Home from './pages/Home';
import Collaborators from './pages/Collaborators';
import CollaboratorModal from './components/CollaboratorModal';
import AdminPanel from './pages/Admin/AdminPanel';

function App() {
  const apps = getApps();
  console.log('Firebase apps:', apps);
  console.log('Firebase app name:', app.name); // ✅ lo usa directamente
  

  return (
    <>
      <LanguageProvider>
        <Router>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/comercios" element={<Collaborators />} />
              <Route path="/comercios/:id" element={<CollaboratorModal />} />
              <Route path="/admin" element={<AdminPanel />} />
              {/* Más rutas se añadirán luego: /eventos, /tienda, /contacto, /admin */}
            </Routes>
          {/* <Footer /> */}
        </Router>
      </LanguageProvider>
    </>
  );
}

export default App;

