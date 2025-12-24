import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './contexts/ProgressContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { IntelligenceProvider } from './contexts/IntelligenceContext';
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
import InnerCircle from './pages/InnerCircle';
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
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedSubscriberRoute from './components/ProtectedSubscriberRoute';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCanceled from './pages/PaymentCanceled';
import PaymentApplicationSubmitted from './pages/PaymentApplicationSubmitted';
import FreeAssessment from './pages/FreeAssessment';
import Pages from './pages/Pages';

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
        <IntelligenceProvider>
          <div className="min-h-screen font-sans text-black selection:bg-black selection:text-white:bg-white:text-black flex flex-col bg-art-offwhite transition-colors duration-300">
            <Navigation />
            <main className="grow">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/dashboard" element={<ProtectedSubscriberRoute><PageTransition><Dashboard /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/wealth" element={<ProtectedSubscriberRoute><PageTransition><Wealth /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/markets" element={<ProtectedSubscriberRoute><PageTransition><Markets /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/intelligence" element={<ProtectedSubscriberRoute><PageTransition><Intelligence /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/strategy" element={<ProtectedSubscriberRoute><PageTransition><Strategy /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/strategy/:id" element={<ProtectedSubscriberRoute><PageTransition><StrategyDetail /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/bio-self" element={<ProtectedSubscriberRoute><PageTransition><BioSelf /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/profile" element={<ProtectedSubscriberRoute><PageTransition><Profile /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/vault" element={<ProtectedSubscriberRoute><PageTransition><Vault /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/sovereign-map" element={<ProtectedSubscriberRoute><PageTransition><SovereignMap /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/legacy-timeline" element={<ProtectedSubscriberRoute><PageTransition><LegacyTimeline /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/integrations" element={<ProtectedSubscriberRoute><PageTransition><Integrations /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
                  <Route path="/assessment" element={<PageTransition><Assessment /></PageTransition>} />
                  <Route path="/skills/:skillId" element={<ProtectedSubscriberRoute allowFreePreview><PageTransition><SkillDetail /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/skills/:skillId/:moduleId" element={<ProtectedSubscriberRoute allowFreePreview><PageTransition><Lesson /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/decisions" element={<ProtectedSubscriberRoute><PageTransition><Decisions /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/levels" element={<ProtectedSubscriberRoute><PageTransition><Levels /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/progress" element={<ProtectedSubscriberRoute><PageTransition><Progress /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/triangles" element={<ProtectedSubscriberRoute><PageTransition><Triangles /></PageTransition></ProtectedSubscriberRoute>} />
                  <Route path="/skill/:id" element={<ProtectedSubscriberRoute><PageTransition><SkillDetail /></PageTransition></ProtectedSubscriberRoute>} />

                  {/* New Pages */}
                  <Route path="/command-center" element={<PageTransition><CommandCenter /></PageTransition>} />
                  <Route path="/admin" element={<ProtectedAdminRoute><PageTransition><AdminDashboard /></PageTransition></ProtectedAdminRoute>} />
                  <Route path="/waitlist" element={<PageTransition><Waitlist /></PageTransition>} />
                  <Route path="/login" element={<PageTransition><Auth /></PageTransition>} />
                  <Route path="/signup" element={<PageTransition><Auth /></PageTransition>} />
                  <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
                  <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
                  <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
                  <Route path="/inner-circle" element={<PageTransition><InnerCircle /></PageTransition>} />
                  <Route path="/payment-success" element={<PageTransition><PaymentSuccess /></PageTransition>} />
                  <Route path="/payment-canceled" element={<PageTransition><PaymentCanceled /></PageTransition>} />
                  <Route path="/payment-application-submitted" element={<PageTransition><PaymentApplicationSubmitted /></PageTransition>} />
                  <Route path="/free-assessment" element={<PageTransition><FreeAssessment /></PageTransition>} />
                  <Route path="/pages" element={<PageTransition><Pages /></PageTransition>} />
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
        </IntelligenceProvider>
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