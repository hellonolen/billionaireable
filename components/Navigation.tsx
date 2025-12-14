import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Mic, MonitorPlay, LayoutGrid, Activity, Cpu, X, Banknote, ChevronDown, User, Lock, Globe, History, GraduationCap, TrendingUp, Target, Triangle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'DASHBOARD', icon: <LayoutGrid className="w-4 h-4" /> },
    { path: '/wealth', label: 'WEALTH', icon: <Banknote className="w-4 h-4" /> },
    { path: '/markets', label: 'MARKETS', icon: <Activity className="w-4 h-4" /> },
    { path: '/intelligence', label: 'INTELLIGENCE', icon: <MonitorPlay className="w-4 h-4" /> },
    { path: '/strategy', label: 'STRATEGY', icon: <Mic className="w-4 h-4" /> },
    { path: '/bio-self', label: 'BIO-SELF', icon: <Cpu className="w-4 h-4" /> },
    { path: '/pricing', label: 'PRICING', icon: <Banknote className="w-4 h-4" /> },
    { path: '/waitlist', label: 'WAITLIST', icon: <Lock className="w-4 h-4" /> },
    { path: '/admin', label: 'ADMIN', icon: <Lock className="w-4 h-4" /> },
  ];

  const profileMenuItems = [
    { path: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { path: '/vault', label: 'Vault', icon: <Lock className="w-4 h-4" /> },
    { path: '/community', label: 'The Network', icon: <Globe className="w-4 h-4" /> },
    { path: '/legacy-timeline', label: 'Legacy', icon: <History className="w-4 h-4" /> },
    { path: '/settings', label: 'Admin', icon: <Lock className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-art-offwhite/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 h-24 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="group flex items-center"
        >
          <span className="font-serif text-3xl md:text-4xl font-black text-black tracking-tighter hover:text-art-orange transition-colors">
            billionaireable.
          </span>
        </button>

        {/* Desktop Nav - Floating Pill Style */}
        <div className="hidden xl:flex items-center bg-white px-2 py-2 rounded-full shadow-soft-xl border border-gray-100 gap-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 ${isActive(item.path)
                ? 'bg-art-orange text-white shadow-lg transform scale-105'
                : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side - Profile Dropdown */}
        <div className="flex items-center gap-4">
          {/* Desktop Profile Dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-3 group"
            >
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black uppercase text-black leading-none">Alex</p>
              </div>
              <div className="h-12 w-12 bg-white p-1 rounded-[18px] shadow-soft-xl cursor-pointer group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-gray-200 rounded-[14px] overflow-hidden flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform hidden lg:block ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-gray-100 py-2 animate-fade-in">
                {profileMenuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsProfileDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${isActive(item.path)
                      ? 'bg-art-orange/10 text-art-orange'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                      }`}
                  >
                    {item.icon}
                    <span className="font-sans text-sm font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-black bg-white rounded-full shadow-soft-xl hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl absolute left-0 right-0 z-40 shadow-2xl">
          <div className="flex flex-col p-4 space-y-2">
            {/* Mobile Menu Items */}
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-4 rounded-2xl text-lg font-bold uppercase transition-all ${isActive(item.path) ? 'bg-art-orange text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            <div className="border-t border-gray-200 my-2"></div>

            <div className="border-t border-gray-200 my-2"></div>
            {profileMenuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 p-4 rounded-2xl text-lg font-bold text-gray-500 hover:bg-gray-50"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;