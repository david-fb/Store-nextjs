import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@styles/Menu.module.scss';
import { signOut } from 'next-auth/react';
import AppContext from '@context/AppContext';

const Menu = () => {
  const { state, toggleMenu } = useContext(AppContext);
  const menuRef = useRef(null);
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (state.menuIsOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        toggleMenu();
      }
    };
    //add event listener
    document.addEventListener('click', handleClickOutside);
    //clear event
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setWindowSize(window.innerWidth <= 800);
    const handleResize = () => {
      setWindowSize(window.innerWidth <= 800);
    };
    window.addEventListener('resize', handleResize);
    if (windowSize && state.menuIsOpen) toggleMenu();
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize]);

  return (
    <div ref={menuRef} className={styles.Menu}>
      <Link href="/orders">
        <a href="orders" className={styles['Menu-item']}>
          My orders
        </a>
      </Link>
      <Link href="/account">
        <a href="account" className={styles['Menu-item']}>
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
