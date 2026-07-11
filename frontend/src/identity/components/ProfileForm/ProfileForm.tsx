import React, { useState } from 'react';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import styles from './ProfileForm.module.css';

interface ProfileFormProps {
  initialDisplayName?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialDisplayName = '' }) => {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const { mutate, isPending } = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ displayName });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="displayName">Display Name</label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};
