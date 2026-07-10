import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './app/pages/HomePage';
import { AppLayout } from './app/components/AppLayout/AppLayout';

// Bare minimum App structure
export const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};
