import { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '@context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import userIcon from '@icons/user_icon_mobile.svg';
import styles from '@styles/MenuMobile.module.scss';

const MenuMobile = () => {
  const { toggleOrder, state, toggleMenuMobile, toggleMenu } = useContext(AppContext);
  const { data: session } = useSession();
  const [windowSize, setWindowSize] = useState(window.innerWidth <= 799);
  const router = useRouter();
  const menuMobileRef = useRef();

  const closeMenuMobile = () => {
    console.log('entra');
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
          <Image src={userIcon} layout='fill'/>
        </figure>
        <p>Hi, <br/>{`${session.user.name} ${session.user.lastName}`}</p>
      </div>
      <ul className={styles['MenuMobile-main']}>
        <li>
          <Link href="/">
            <a onClick={closeMenuMobile} className={`${router.pathname == '/' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              Inicio
            </a>
          </Link>
        </li>
        <li>
          <Link href="/toys">
            <a onClick={closeMenuMobile} className={`${router.pathname == '/toys' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              Juguetes
            </a>
          </Link>
        </li>
        <li>
          <Link href="/care-and-maternity">
            <a onClick={closeMenuMobile} className={`${router.pathname == '/care-and-maternity' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              Cuidado
            </a>
          </Link>
        </li>
        <li>
          <Link href="/clothes">
            <a onClick={closeMenuMobile} className={`${router.pathname == '/clothes' ? styles['active'] : ''} ${styles['MenuMobile-main-item']}`}>
              Ropa
            </a>
          </Link>
        </li>
      </ul>

      <ul className={styles['MenuMobile-control']}>
        {session?.user ? (
          <>
            <li className={styles['MenuMobile-control-user']}>
              <p>{`${session.user.name} ${session.user.lastName}`}</p>
            </li>
            <li>
              <Link href={'/account'}>
                <a onClick={closeMenuMobile} className={`${router.pathname == '/account' ? styles['active'] : ''} ${styles['MenuMobile-control-item']}`}>
                  Account
                </a>
              </Link>
            </li>
            <li>
              <Link href={'/orders'}>
                <a onClick={closeMenuMobile} className={`${router.pathname == '/orders' ? styles['active'] : ''} ${styles['MenuMobile-control-item']}`}>
                  Orders
                </a>
              </Link>
            </li>
            <li>
              <button onClick={signOut} className={styles['MenuMobile-control-item']}>
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/login'}>
                <a onClick={closeMenuMobile} className={`${router.pathname == '/login' ? styles['active'] : ''} ${styles['MenuMobile-control-item']}`}>
                  Log in
                </a>
              </Link>
            </li>
            <li>
              <Link href={'/signup'}>
                <a onClick={closeMenuMobile} className={`${router.pathname == '/signup' ? styles['active'] : ''} ${styles['MenuMobile-control-item']}`}>
                  Register
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MenuMobile;
