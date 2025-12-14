import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useEffect } from 'react';

export function useConvexUser() {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const getOrCreateUser = useMutation(api.users.getOrCreateUser);
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    isSignedIn && clerkUser ? { clerkId: clerkUser.id } : "skip"
  );

  // Sync Clerk user to Convex on sign in
  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      getOrCreateUser({
        clerkId: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        name: clerkUser.fullName || undefined,
        imageUrl: clerkUser.imageUrl || undefined,
      });
    }
  }, [isLoaded, isSignedIn, clerkUser, getOrCreateUser]);

  return {
    user: convexUser,
    clerkUser,
    isLoaded,
    isSignedIn,
  };
}


