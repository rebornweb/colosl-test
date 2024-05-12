import { FC } from 'react';
import styles from './avatar.module.css';

interface AvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
}

export const Avatar: FC<AvatarProps> = ({ firstName, lastName, name }) => {
  const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastLetter = lastName ? lastName.charAt(0).toUpperCase() : '';

  return (
    <div className={styles.avatar}>
      {firstLetter}
      {lastLetter}
      {name}
    </div>
  
);
};
