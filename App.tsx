import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import BioSelf from './pages/BioSelf';
import DetailView from './pages/DetailView';
import Intelligence from './pages/Intelligence';
import Strategy from './pages/Strategy';
import Pricing from './pages/Pricing';
import Wealth from './pages/Wealth';
import { Privacy, Terms, Disclaimer } from './pages/Policies';
import NotFound from './pages/NotFound';

import Profile from './pages/Profile';
import Vault from './pages/Vault';
import SovereignMap from './pages/SovereignMap';
import LegacyTimeline from './pages/LegacyTimeline';
import Integrations from './pages/Integrations';
import Onboarding from './pages/Onboarding';
import Assessment from './pages/Assessment';
import Decisions from './pages/Decisions';
import Levels from './pages/Levels';
import Triangles from './pages/Triangles';
import SkillDetail from './pages/SkillDetail';
import Settings from './pages/Settings';
import Community from './pages/Community';
import CommandCenter from './pages/CommandCenter';
import Progress from './pages/Progress';
import Lesson from './pages/Lesson';
import Waitlist from './pages/Waitlist';
import AdminDashboard from './pages/AdminDashboard';

import Footer from './components/Footer';
import ConciergeWidget from './components/ConciergeWidget';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (id: string) => {
    navigate(`/detail/${id}`);
    window.scrollTo(0, 0);
  };

  const handleBackFromDetail = () => {
    navigate('/');
  };

  return (
    <ProgressProvider>
      <div className="min-h-screen font-sans text-black selection:bg-black selection:text-white flex flex-col bg-art-offwhite">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wealth" element={<Wealth />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/bio-self" element={<BioSelf />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/sovereign-map" element={<SovereignMap />} />
            <Route path="/legacy-timeline" element={<LegacyTimeline />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/skills/:skillId" element={<SkillDetail />} />
            <Route path="/skills/:skillId/:moduleId" element={<Lesson />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/triangles" element={<Triangles />} />
            <Route path="/skill/:id" element={<SkillDetail />} />

            {/* New Pages */}
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            <Route
              path="/detail/:id"
              element={<DetailViewWrapper onBack={handleBackFromDetail} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ConciergeWidget />
        <Footer />
      </div>
    </ProgressProvider>
  );
};

// Wrapper to extract params and pass to DetailView
import { useParams } from 'react-router-dom';

const DetailViewWrapper: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return <DetailView cardId={id} onBack={onBack} />;
};

export default App;