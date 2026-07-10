import React, { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';
import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Registering...' : 'Register'}
      </button>
      {registerMutation.isError && <p className={styles.error}>Registration failed.</p>}
      {registerMutation.isSuccess && <p>Registration successful! Please login.</p>}
    </form>
  );
};
