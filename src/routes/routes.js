import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import StateComplete from '../pages/StateComplete';

const Navigation = () => (
  <BrowserRouter>
    <Routes>
      <Route
        exact
        path="/"
        element={<Home />}
      />
      <Route
        path="/state-complete"
        element={<StateComplete />}
      />
    </Routes>
  </BrowserRouter>
);

export default Navigation;
