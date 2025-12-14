import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Loader2, Lock } from 'lucide-react';

interface ProtectedSubscriberRouteProps {
  children: React.ReactNode;
  allowedPlans?: string[]; // Optional: restrict to specific plans
  allowFreePreview?: boolean; // Allow access to first module for free
}

const ProtectedSubscriberRoute: React.FC<ProtectedSubscriberRouteProps> = ({ 
  children, 
  allowedPlans,
  allowFreePreview = false 
}) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const location = useLocation();
  
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    isSignedIn && user?.id ? { clerkId: user.id } : "skip"
  );

  const subscription = useQuery(
    api.stripe.hasActiveSubscription,
    convexUser ? { userId: convexUser._id } : "skip"
  );

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Not signed in - redirect to sign in
  if (!isSignedIn) {
    return <Navigate to="/waitlist" state={{ from: location }} replace />;
  }

  // Still loading user or subscription data
  if (convexUser === undefined || subscription === undefined) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Check free preview access (Pillar 1, Module 1 only)
  if (allowFreePreview) {
    const path = location.pathname;
    const isFirstModule = path.includes('/skills/reality-distortion/1');
    if (isFirstModule) {
      return <>{children}</>;
    }
  }

  // No subscription - show upgrade prompt
  if (!subscription.hasSubscription) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-12 text-center max-w-lg shadow-soft-xl border border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 bg-art-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-art-orange" />
          </div>
          <h1 className="font-sans text-3xl font-black text-black dark:text-white mb-4">
            This Is The Path.
          </h1>
          <p className="font-serif text-lg text-gray-600 dark:text-gray-400 mb-6">
            You're ready for the next step. Access to the 12 Pillars requires a subscription.
          </p>
          <p className="font-serif text-base text-gray-500 dark:text-gray-500 mb-8">
            Start with Pillar 1 for free, or unlock the complete billionaire path.
          </p>
          
          <div className="space-y-3">
            <a
              href="/skills/reality-distortion/1"
              className="block w-full py-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Start Free Preview
            </a>
            <a
              href="/pricing"
              className="block w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Check if plan is allowed (if specific plans required)
  if (allowedPlans && subscription.plan && !allowedPlans.includes(subscription.plan)) {
    return (
      <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-12 text-center max-w-lg shadow-soft-xl border border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 bg-art-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-art-blue" />
          </div>
          <h1 className="font-sans text-3xl font-black text-black dark:text-white mb-4">
            Upgrade Required
          </h1>
          <p className="font-serif text-lg text-gray-600 dark:text-gray-400 mb-6">
            This content requires the {allowedPlans.join(' or ')} plan.
          </p>
          <p className="font-mono text-xs text-gray-400 mb-8">
            Current plan: {subscription.plan}
          </p>
          
          <a
            href="/pricing"
            className="block w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    );
  }

  // User has valid subscription - render the protected content
  return <>{children}</>;
};

export default ProtectedSubscriberRoute;

