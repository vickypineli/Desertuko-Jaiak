// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageProvider';
import app from './firebase/config';  
import { getApps } from 'firebase/app';
import Navbar from './components/common/Navbar';
import Home from './pages/Home/Home.jsx';
import CollaboratorsPage from './pages/Home/CollaboratorsPage.jsx';
import CollaboratorModal from './components/collaborators/CollaboratorModal.jsx';
import AdminPanel from './pages/Admin/AdminPanel';
import CollaboratorsAdmin from './pages/Admin/CollaboratorsAdmin/CollaboratorsAdmin.jsx';
import ShopsAdmin from './pages/Admin/ShopAdmin/ShopsAdmin.jsx';
import EventsAdmin from './pages/Admin/EventsAdmin/EventsAdmin';
import ShopPage from './pages/Home/ShopPage.jsx';


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
              <Route path="/comercios" element={<CollaboratorsPage />} />
              <Route path="/comercios/:id" element={<CollaboratorModal />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/collaborators" element={<CollaboratorsAdmin />} />
              <Route path="/admin/shop" element={<ShopsAdmin />} />
              <Route path="/admin/events" element={<EventsAdmin />} />
              <Route path="/tienda" element={<ShopPage />} />
              {/* Más rutas se añadirán luego: /eventos, /tienda, /contacto, /admin */}
            </Routes>
          {/* <Footer /> */}
        </Router>
      </LanguageProvider>
    </>
  );
}

export default App;

