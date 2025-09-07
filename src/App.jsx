import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobePage from './pages/GlobePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobePage />} />
      </Routes>
    </Router>
  );
}