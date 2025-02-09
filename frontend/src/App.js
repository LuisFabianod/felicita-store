import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './templates/home';
import { Auth } from './templates/auth';
import { Account } from './templates/account';
import { ResetPassword } from './components/ResetPassword';
import { Terms } from './components/TermsAndPrivacyPolitics/terms';
import { Privacy } from './components/TermsAndPrivacyPolitics/privacy';
import { AdminInterface } from './templates/AdminInterface';
import { Header } from './components/Header';
import { ProductPage } from './templates/ProductPage';

import { IsAdminContext } from './Contexts/IsAdmin';
import { IsLoadingContext } from './Contexts/IsLoading';
import { ProductRegister } from './components/ProductRegister';
import { Products } from './components/Products';
import { LayoutConfig } from './components/LayoutConfig';

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>

      <Router>
        <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
          <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-politics" element={<Privacy />} />
              <Route path="/admin-interface" element={<AdminInterface />} />
              <Route path="/admin-interface/register-product" element={<ProductRegister />} />
              <Route path="/admin-interface/products" element={<Products />} />
              <Route path="/admin-interface/layout-config" element={<LayoutConfig />} />
              <Route path="/product" element={<ProductPage/>}/>
            </Routes>
          </IsLoadingContext.Provider>
        </IsAdminContext.Provider>
      </Router>

    </>
  );
}

export default App;