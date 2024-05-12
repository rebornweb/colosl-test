import { useSession } from 'next-auth/react';

export const useRequireAuth = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // If session status is loading, wait for authentication check

    console.log('Loading status')
    return null;
  }

  if (!session) {
    // If user is not authenticated, redirect to login page
    window.location.replace('/login');
  }

  return session;
};
