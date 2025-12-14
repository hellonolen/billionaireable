import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook that redirects users to onboarding if they haven't completed it
 * Returns loading state and whether onboarding is complete
 */
export function useRequireOnboarding() {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useAuth();

  const isLoading = !isLoaded;
  const onboardingComplete = user?.onboardingComplete === true;

  useEffect(() => {
    // Only redirect once we have loaded the user data
    if (!isLoading && isSignedIn && user && !onboardingComplete) {
      navigate('/onboarding', { replace: true });
    }
  }, [isLoading, isSignedIn, user, onboardingComplete, navigate]);

  return {
    isLoading,
    onboardingComplete,
    user,
  };
}
