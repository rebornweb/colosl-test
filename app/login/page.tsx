'use client'

import { LoginForm } from '@/components';
import LoginLayout from './layout'; 
import styles from './login.module.css'; 

export default function Auth() {
  return (
    <LoginLayout title="Login Page">
      <main className={styles.main}>
        <LoginForm>
          <div className={styles.intro}>
            <h1>Login</h1>
            <p>
              Please enter your email and
              <br /> password to login
            </p>
          </div>
        </LoginForm>
      </main>
    </LoginLayout>
  );
}
