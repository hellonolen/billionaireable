import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Loader2, Lock } from 'lucide-react';

interface ProtectedSubscriberRouteProps {
  children: React.ReactNode;
  allowFreePreview?: boolean;
}

// Skills that are free (Pillar 1)
const FREE_SKILLS = ['reality-distortion'];

const ProtectedSubscriberRoute: React.FC<ProtectedSubscriberRouteProps> = ({ 
  children, 
  allowFreePreview = false 
}) => {
  const { user, isLoaded, isSignedIn, sessionToken } = useAuth();
  const { skillId } = useParams<{ skillId: string }>();
  
  // Check subscription status
  const subscription = useQuery(
    api.stripe.getSubscription,
    user?._id ? { userId: user._id } : "skip"
  );

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Check if this is free content
  const isFreeContent = allowFreePreview && skillId && FREE_SKILLS.includes(skillId);
  
  // If free content, allow access even without sign-in
  if (isFreeContent) {
    return <>{children}</>;
  }

  // Not signed in - redirect to login
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Still loading subscription
  if (subscription === undefined) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Check if user has active subscription
  const hasActiveSubscription = subscription?.status === 'active';

  // No subscription and not free content - show upgrade prompt
  if (!hasActiveSubscription && !isFreeContent) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-12 text-center max-w-md shadow-soft-xl border border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 bg-art-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-art-orange" />
          </div>
          <h1 className="font-sans text-2xl font-bold text-black dark:text-white mb-2">
            Premium Content
          </h1>
          <p className="font-serif text-gray-500 dark:text-gray-400 mb-6">
            This content is available to subscribers. Choose your tier to continue.
          </p>
          <div className="space-y-3">
            <a
              href="/pricing"
              className="block w-full px-6 py-3 bg-art-orange text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-art-orange/80 transition-colors"
            >
              View Pricing
            </a>
            <a
              href="/skills/reality-distortion/1"
              className="block w-full px-6 py-3 text-gray-500 font-mono text-xs font-bold uppercase hover:text-black dark:hover:text-white transition-colors"
            >
              Try Pillar 1 Free →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Has subscription or free content - render
  return <>{children}</>;
};

export default ProtectedSubscriberRoute;
