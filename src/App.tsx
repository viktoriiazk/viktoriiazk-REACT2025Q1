import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Page404 from './pages/404';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:page" element={<HomePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
