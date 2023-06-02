import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignIn from './pages/SignIn';
import { routes } from './utils/routes';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path={routes.signIn} element={<SignIn />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </div>
);

export default App;
