import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to get the current user from our Convex auth
 * Replaces the old Clerk-based hook
 */
export function useConvexUser() {
  const { user, isLoaded, isSignedIn } = useAuth();

  return {
    user,
    isLoaded,
    isSignedIn,
  };
}
