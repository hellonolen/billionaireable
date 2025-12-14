import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './contexts/ProgressContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import BioSelf from './pages/BioSelf';
import DetailView from './pages/DetailView';
import Intelligence from './pages/Intelligence';
import Strategy from './pages/Strategy';
import StrategyDetail from './pages/StrategyDetail';
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
    <ThemeProvider>
    <ProgressProvider>
      <div className="min-h-screen font-sans text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col bg-art-offwhite dark:bg-gray-950 transition-colors duration-300">
        <Navigation />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
              <Route path="/wealth" element={<PageTransition><Wealth /></PageTransition>} />
              <Route path="/markets" element={<PageTransition><Markets /></PageTransition>} />
              <Route path="/intelligence" element={<PageTransition><Intelligence /></PageTransition>} />
              <Route path="/strategy" element={<PageTransition><Strategy /></PageTransition>} />
              <Route path="/strategy/:id" element={<PageTransition><StrategyDetail /></PageTransition>} />
              <Route path="/bio-self" element={<PageTransition><BioSelf /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
              <Route path="/vault" element={<PageTransition><Vault /></PageTransition>} />
              <Route path="/sovereign-map" element={<PageTransition><SovereignMap /></PageTransition>} />
              <Route path="/legacy-timeline" element={<PageTransition><LegacyTimeline /></PageTransition>} />
              <Route path="/integrations" element={<PageTransition><Integrations /></PageTransition>} />
              <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
              <Route path="/assessment" element={<PageTransition><Assessment /></PageTransition>} />
              <Route path="/skills/:skillId" element={<PageTransition><SkillDetail /></PageTransition>} />
              <Route path="/skills/:skillId/:moduleId" element={<PageTransition><Lesson /></PageTransition>} />
              <Route path="/decisions" element={<PageTransition><Decisions /></PageTransition>} />
              <Route path="/levels" element={<PageTransition><Levels /></PageTransition>} />
              <Route path="/progress" element={<PageTransition><Progress /></PageTransition>} />
              <Route path="/triangles" element={<PageTransition><Triangles /></PageTransition>} />
              <Route path="/skill/:id" element={<PageTransition><SkillDetail /></PageTransition>} />

              {/* New Pages */}
              <Route path="/command-center" element={<PageTransition><CommandCenter /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
              <Route path="/waitlist" element={<PageTransition><Waitlist /></PageTransition>} />
              <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
              <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
              <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
              <Route path="/disclaimer" element={<PageTransition><Disclaimer /></PageTransition>} />

              <Route
                path="/detail/:id"
                element={<PageTransition><DetailViewWrapper onBack={handleBackFromDetail} /></PageTransition>}
              />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <ConciergeWidget />
        <Footer />
      </div>
    </ProgressProvider>
    </ThemeProvider>
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