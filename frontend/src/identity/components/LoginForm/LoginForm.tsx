import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Sign in to Connect Africa</h2>
      <input 
        type="email" 
        placeholder="Email address" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {loginMutation.isError && <p className={styles.error}>Invalid email or password.</p>}
      <div className={styles.footer}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
};
