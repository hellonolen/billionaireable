import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Loader2, ShieldX } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  
  const isAdmin = useQuery(
    api.users.isUserAdmin,
    user?.id ? { clerkId: user.id } : "skip"
  );

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Not signed in - redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Still checking admin status
  if (isAdmin === undefined) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Not an admin - show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-12 text-center max-w-md shadow-soft-xl border border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="font-sans text-2xl font-bold text-black dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="font-serif text-gray-500 dark:text-gray-400 mb-6">
            You don't have permission to access this area.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  // User is admin - render the protected content
  return <>{children}</>;
};

export default ProtectedAdminRoute;


