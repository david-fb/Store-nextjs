import React from 'react';
import Link from 'next/link';
import styles from '@styles/Menu.module.scss';
import { signOut } from 'next-auth/react';

const Menu = () => {
  return (
    <div className={styles.Menu}>
      <Link href="/orders">
        <a className={styles['Menu-item']}>
          My orders
        </a>
      </Link>
      <Link href="/account">
        <a className={styles['Menu-item']}>
          My account
        </a>
      </Link>
      <button onClick={signOut} className={styles['Menu-item']}>
        Sign out
      </button>
    </div>
  );
};

export default Menu;
