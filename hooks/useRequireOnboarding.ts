import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

/**
 * Hook that redirects users to onboarding if they haven't completed it
 * Returns loading state and whether onboarding is complete
 */
export function useRequireOnboarding() {
  const navigate = useNavigate();
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();

  const convexUser = useQuery(
    api.users.getUserByClerkId,
    isSignedIn && clerkUser ? { clerkId: clerkUser.id } : "skip"
  );

  const isLoading = !isLoaded || (isSignedIn && convexUser === undefined);
  const onboardingComplete = convexUser?.onboardingComplete === true;

  useEffect(() => {
    // Only redirect once we have loaded the user data
    if (!isLoading && isSignedIn && convexUser && !onboardingComplete) {
      navigate('/onboarding', { replace: true });
    }
  }, [isLoading, isSignedIn, convexUser, onboardingComplete, navigate]);

  return {
    isLoading,
    onboardingComplete,
    user: convexUser,
  };
}

