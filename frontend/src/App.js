import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './templates/home';
import { Auth } from './templates/auth';
import { Account } from './templates/account';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>

  );
}

export default App;