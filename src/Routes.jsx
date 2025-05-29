import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import MovieLibraryPage from './pages/MovieLibrary';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/movie-library" element={<MovieLibraryPage />} />
        <Route path="/" element={<MovieLibraryPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;