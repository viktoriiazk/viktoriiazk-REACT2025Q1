import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/viktoriiazk-REACT2025Q1/" element={<HomePage />} />
        <Route
          path="/viktoriiazk-REACT2025Q1/search/:page"
          element={<HomePage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
