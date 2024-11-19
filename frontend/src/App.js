import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './templates/home';
import { Auth } from './templates/auth';

function App() {

  return (
    // Envolver o Router com o Provider para compartilhar o contexto globalmente
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>

  );
}

export default App;