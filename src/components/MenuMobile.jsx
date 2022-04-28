import { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '@context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import userIcon from '@icons/user_icon_mobile.svg';
import homeIcon from '@icons/home-icon.svg';
import accountIcon from '@icons/account-icon.svg';
import ordersIcon from '@icons/bag-icon.svg';
import toysIcon from '@icons/toys-icon.svg';
import careIcon from '@icons/care-icon.svg';
import clothesIcon from '@icons/clothes-icon.svg';
import logOutIcon from '@icons/logOut-icon.svg';
import styles from '@styles/MenuMobile.module.scss';

const MenuMobile = () => {
  const { toggleOrder, state, toggleMenuMobile, toggleMenu } = useContext(AppContext);
  const { data: session } = useSession();
  const [windowSize, setWindowSize] = useState(window.innerWidth <= 799);
  const router = useRouter();
  const menuMobileRef = useRef();

  const closeMenuMobile = () => {
    menuMobileRef.current.classList.add(styles['menuOut']);
    setTimeout(() => {
      toggleMenuMobile();
    }, 300);
  };
  useEffect(() => {
    if (state.orderIsOpen) {
      toggleOrder();
    }
    if (state.menuIsOpen) {
      toggleMenu();
    }
    const handleClickOutside = (e) => {
      if (state.menuMobileIsOpen && menuMobileRef.current && !menuMobileRef.current.contains(e.target)) {
        closeMenuMobile();
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
    const handleResize = () => {
      setWindowSize(window.innerWidth <= 799);
    };
    window.addEventListener('resize', handleResize);
    if (!windowSize) toggleMenuMobile();
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize]);

  return (
    <nav ref={menuMobileRef} className={styles['MenuMobile']}>
      <button className={styles['MenuMobile-close']} onClick={closeMenuMobile}>
        X
      </button>
      <div className={styles['MenuMobile-user']}>
        <figure>
          <Image src={userIcon} layout="fill" alt="" />
        </figure>
        {session?.user ? (
          <p>
            Hi, <br />
            {`${session.user.name} ${session.user.lastName}`}
          </p>
        ) : (
          <>
            <Link href={'/login'}>
              <a href="dummy" onClick={closeMenuMobile} className={`primary-button ${styles['MenuMobile-user-login']}`}>
                Log in
              </a>
            </Link>
            <Link href={'/signup'}>
              <a href="dummy" onClick={closeMenuMobile} className={`${styles['MenuMobile-user-register']}`}>
                Register
              </a>
            </Link>
          </>
        )}
      </div>
      <ul className={styles['MenuMobile-main']}>
        <li>
          <Link href="/">
            <a href="dummy" onClick={closeMenuMobile} className={`${router.pathname == '/' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              <figure>
                <Image src={homeIcon} layout="fill" alt="" />
              </figure>
              Home
            </a>
          </Link>
        </li>
        {session?.user && (
          <>
            <li>
              <Link href={'/account'}>
                <a href="dummy" onClick={closeMenuMobile} className={`${router.pathname == '/account' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
                  <figure>
                    <Image src={accountIcon} layout="fill" alt="" />
                  </figure>
                  Account
                </a>
              </Link>
            </li>
            <li>
              <Link href={'/orders'}>
                <a href="dummy" onClick={closeMenuMobile} className={`${router.pathname == '/orders' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
                  <figure>
                    <Image src={ordersIcon} layout="fill" alt="" />
                  </figure>
                  Orders
                </a>
              </Link>
            </li>
          </>
        )}
        <li>
          <Link href="/toys">
            <a href="dummy" onClick={closeMenuMobile} className={`${router.pathname == '/toys' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              <figure>
                <Image src={toysIcon} layout="fill" alt="" />
              </figure>
              Toys
            </a>
          </Link>
        </li>
        <li>
          <Link href="/care-and-maternity">
            <a href="dummy" onClick={closeMenuMobile} className={`${router.pathname == '/care-and-maternity' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              <figure>
                <Image src={careIcon} layout="fill" alt="" />
              </figure>
              Care
            </a>
          </Link>
        </li>
        <li>
          <Link href="/clothes">
            <a href="dummy" onClick={closeMenuMobile} className={`${router.pathname == '/clothes' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              <figure>
                <Image src={clothesIcon} layout="fill" alt="" />
              </figure>
              Clothes
            </a>
          </Link>
        </li>
        {session?.user && (
          <>
            <li>
              <button onClick={signOut} className={styles['MenuMobile-main-item']}>
                <figure>
                  <Image src={logOutIcon} layout="fill" alt="" />
                </figure>
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MenuMobile;
