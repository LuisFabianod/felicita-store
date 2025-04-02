import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResetPassword } from './components/ResetPassword';
import { Terms } from './components/TermsAndPrivacyPolitics/terms';
import { Privacy } from './components/TermsAndPrivacyPolitics/privacy';
import { Header } from './components/Header';
import { ProductRegister } from './components/ProductRegister';
import { Products } from './components/Products';
import { LayoutConfig } from './components/LayoutConfig';
import { ProductPage } from './pages/ProductPage';
import { FavoriteProducts } from './pages/FavoriteProducts';
import { Cart } from './pages/Cart';
import { AdminInterface } from './pages/AdminInterface';
import { Home } from './pages/home';
import { Auth } from './pages/Auth';
import { Account } from './pages/Account';

import { IsAdminContext } from './Contexts/IsAdmin';
import { IsLoadingContext } from './Contexts/IsLoading';
import { IsLoggedInContext } from './Contexts/IsLoggedIn';

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>

      <Router>
        <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
        <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
              <Route path="/favorite-products" element={<FavoriteProducts/>}/>
              <Route path="/shopping-cart" element={<Cart/>}/>
            </Routes>
          </IsLoadingContext.Provider>
          </IsLoggedInContext.Provider>
        </IsAdminContext.Provider>
      </Router>

    </>
  );
}

export default App;