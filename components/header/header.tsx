'use client'

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Avatar } from '../avatar/avatar';
import { Button } from '../Button/Button';
import styles from './header.module.css';

export const Header: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const onLogout = () =>
    signOut({
      callbackUrl: '/login',
    });

  const login = () => router.push('/login');

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        A
      </a>
      {session ? (
        <>
          <Button size="sm" outline onClick={onLogout}>
            Logout
          </Button>
          <Avatar name={session.user?.email?.slice(0,2)} />
        </>
      ) : (
        <Button size="sm" outline onClick={login}>
          Login
        </Button>
      )}
    </header>
  );
};
