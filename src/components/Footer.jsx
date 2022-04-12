import React from 'react';
import Link from 'next/link';
import styles from '@styles/Footer.module.scss';

const Footer = () => {

  return (
    <div className={styles.Footer}>
      <nav className={styles['Footer-nav']}>
        <h1>store</h1>
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/toys">Juguetes</Link>
          </li>
          <li>
            <Link href="/care-and-maternity">Cuidado y Maternidad</Link>
          </li>
          <li>
            <Link href="/clothes">Ropa</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
