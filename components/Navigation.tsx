import React, { useState, useRef, useEffect } from 'react';
import { Menu, LayoutGrid, Mic, X, Banknote, ChevronDown, User, Lock, Globe, History, Sun, Moon, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, isSignedIn, signOut, isLoaded } = useAuth();

  const navItems = [
    { path: '/', label: 'HOME', icon: <LayoutGrid className="w-4 h-4" /> },
    { path: '/dashboard', label: 'DASHBOARD', icon: <LayoutGrid className="w-4 h-4" /> },
    { path: '/strategy', label: 'STRATEGY', icon: <Mic className="w-4 h-4" /> },
    { path: '/pricing', label: 'PRICING', icon: <Banknote className="w-4 h-4" /> },
    { path: '/waitlist', label: 'WAITLIST', icon: <Lock className="w-4 h-4" /> },
  ];

  const profileMenuItems = [
    { path: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { path: '/vault', label: 'Vault', icon: <Lock className="w-4 h-4" /> },
    { path: '/community', label: 'The Network', icon: <Globe className="w-4 h-4" /> },
    { path: '/legacy-timeline', label: 'Legacy', icon: <History className="w-4 h-4" /> },
    ...(user?.isAdmin ? [{ path: '/admin', label: 'Admin', icon: <Lock className="w-4 h-4" /> }] : []),
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-art-offwhite/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-black/10 dark:border-white/10 shadow-sm transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="group flex items-center"
        >
          <span className="font-serif text-2xl lg:text-3xl font-black text-black dark:text-white tracking-tighter hover:text-art-orange transition-colors whitespace-nowrap">
            billionaireable.
          </span>
        </button>

        {/* Desktop Nav - Floating Pill Style */}
        <div className="hidden xl:flex items-center bg-white dark:bg-gray-800 px-1.5 py-1.5 rounded-full shadow-soft-xl border border-gray-100 dark:border-gray-700 gap-1 flex-shrink-0 transition-colors duration-300">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-full transition-all duration-300 ${isActive(item.path)
                ? 'bg-art-orange text-white shadow-lg transform scale-105'
                : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side - Auth & Profile */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-soft-xl hover:scale-105 transition-all border border-gray-100 dark:border-gray-700"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-art-orange" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Auth - Signed Out State */}
          {isLoaded && !isSignedIn && (
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-art-orange dark:hover:bg-art-orange dark:hover:text-white transition-colors shadow-lg"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Auth - Signed In State */}
          {isLoaded && isSignedIn && user && (
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 group"
              >
                <div className="h-12 w-12 bg-gradient-to-br from-black to-gray-600 rounded-[18px] shadow-soft-xl cursor-pointer group-hover:scale-105 transition-transform flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform hidden lg:block ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-[24px] shadow-2xl border border-gray-100 dark:border-gray-700 py-2 animate-fade-in">
                  {/* User Info */}
                  <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-sans font-bold text-black dark:text-white truncate">
                      {user.name || 'User'}
                    </p>
                    <p className="font-mono text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  {profileMenuItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsProfileDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${isActive(item.path)
                        ? 'bg-art-orange/10 text-art-orange'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white'
                        }`}
                    >
                      {item.icon}
                      <span className="font-sans text-sm font-bold">{item.label}</span>
                    </button>
                  ))}

                  <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-sans text-sm font-bold">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-black dark:text-white bg-white dark:bg-gray-800 rounded-full shadow-soft-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl absolute left-0 right-0 z-40 shadow-2xl">
          <div className="flex flex-col p-4 space-y-2">
            {/* Mobile Auth Buttons */}
            {isLoaded && !isSignedIn && (
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                  className="flex-1 py-3 text-sm font-bold uppercase text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-2xl"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
                  className="flex-1 py-3 text-sm font-bold uppercase text-white bg-black dark:bg-white dark:text-black rounded-2xl"
                >
                  Get Started
                </button>
              </div>
            )}

            {isLoaded && isSignedIn && user && (
              <div className="flex items-center gap-3 p-4 mb-2 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-black dark:text-white">{user.name || 'User'}</p>
                  <p className="font-mono text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            )}

            {/* Mobile Menu Items */}
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-4 rounded-2xl text-lg font-bold uppercase transition-all ${isActive(item.path) ? 'bg-art-orange text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            {isLoaded && isSignedIn && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                {profileMenuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl text-lg font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 p-4 rounded-2xl text-lg font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
