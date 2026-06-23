/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect } from 'react';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Account from './pages/Account';
import { initFirebase } from './store/syncFirebase';

export default function App() {
  useEffect(() => {
    initFirebase();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/services" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
