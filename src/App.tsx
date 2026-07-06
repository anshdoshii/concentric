import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import { Landing } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { Recommendation } from './pages/Recommendation';
import { Learn } from './pages/Learn';
import { Assessment } from './pages/Assessment';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Onboarding />} />
          <Route path="/app/recommendation" element={<Recommendation />} />
          <Route path="/app/learn" element={<Learn />} />
          <Route path="/app/assessment" element={<Assessment />} />
          <Route path="/app/dashboard" element={<Dashboard />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
