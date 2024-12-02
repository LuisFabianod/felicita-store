import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './templates/home';
import { Auth } from './templates/auth';
import { Account } from './templates/account';
import { ResetPassword } from './components/ResetPassword';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>

  );
}

export default App;