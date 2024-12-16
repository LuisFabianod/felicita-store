import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './templates/home';
import { Auth } from './templates/auth';
import { Account } from './templates/account';
import { ResetPassword } from './components/ResetPassword';
import { Terms } from './components/terms-and-privacyPolitcs/terms';
import { Privacy } from './components/terms-and-privacyPolitcs/privacy';
import { AdminInterface } from './components/AdminInterface';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/terms" element={<Terms/>}/>
          <Route path="/privacy-politics" element={<Privacy/>}/>
          <Route path="/admin-interface" element={<AdminInterface/>}/>
        </Routes>
      </Router>
  );
}

export default App;