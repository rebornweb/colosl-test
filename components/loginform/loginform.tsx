'use client'

import { Card } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import styles from './login-form.module.css';

interface LoginFormProps {
  children?: ReactNode;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Please enter password',
  }),
});

export const LoginForm: FC<LoginFormProps> = ({ children }) => {
  const { handleSubmit, register } = useForm<LoginFormData>({
    resolver: zodResolver(authSchema),
  });

  const { data: session } = useSession();

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormData> = async (body) => {
    try {
      const res = await signIn('credentials', {
        callbackUrl: '/contacts',
        email: body.email,
        password: body.password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password.');
      } else {
        window.location.href = '/contacts';
      }
    } catch (error) {
      console.error(error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Card className={styles.card}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {children}
        <input type="email" {...register('email')} placeholder="Email" />
        <input type="password" {...register('password')} placeholder="Password" />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'white' }}>{error}</p>}
        {session ? (
          <p>
            <a
              href="/contacts"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contacts';
              }}
            >
              Go to Dashboard Contacts
            </a>
          </p>
        ) : (
          <p>Please sign in</p>
        )}
      </form>
    </Card>
  );
};
