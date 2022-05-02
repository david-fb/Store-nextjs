import { useContext } from 'react';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import userIcon from '@icons/user_icon.svg';
import arrowDown from '@icons/arrow-down.svg';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import NextJSIcon from '@icons/next-js-icon.svg';
import Menu from '@components/Menu';
import NavbarUserNameLoading from './skeletonLoading/navbarUserName';
import styles from '@styles/Nav.module.scss';

export default function Nav() {
  const { state, toggleOrder, toggleMenu } = useContext(AppContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <nav className={styles['navbar']}>
      <Link href={'/'}>
        <a href="dummy" className={styles['navbar-logo']} title="Next Shop">
          <Image src={NextJSIcon} layout="fill" alt="" />
        </a>
      </Link>
      <ul className={styles['navbar-left']}>
        <li className={styles[router.pathname == '/' ? 'active' : '']}>
          <Link href="/">
            <a href="dummy">Home</a>
          </Link>
        </li>
        <li className={styles[router.pathname == '/toys' ? 'active' : '']}>
          <Link href="/toys">
            <a href="dummy">Toys</a>
          </Link>
        </li>
        <li className={styles[router.pathname == '/care-and-maternity' ? 'active' : '']}>
          <Link href="/care-and-maternity">
            <a href="dummy">Care</a>
          </Link>
        </li>
        <li className={styles[router.pathname == '/clothes' ? 'active' : '']}>
          <Link href="/clothes">
            <a href="dummy">Clothes</a>
          </Link>
        </li>
      </ul>

      <ul className={styles['navbar-right']}>
        {status === 'loading' && (
          <li className={styles['navbar-userNameLoading']}>
            <NavbarUserNameLoading />
          </li>
        )}
        {session?.user && status !== 'loading' && (
          <li className={styles['navbar-userName']}>
            <button onClick={() => toggleMenu()} className={styles['navbar-userName-toggleMenu']}>
              <Image src={userIcon} width={25} height={25} alt="" />
              {`${session.user.name} ${session.user.lastName}`}
              <Image src={arrowDown} width={20} height={10} alt="" />
            </button>
            {state.menuIsOpen && <Menu />}
          </li>
        )}
        {!session?.user && status !== 'loading' && (
          <li className={styles['navbar-access']}>
            <Link href={'/login'}>
              <a href="dummy">Log in</a>
            </Link>
            <Link href={'/signup'}>
              <a href="dummy">Register</a>
            </Link>
          </li>
        )}
        <li>
          <button onClick={() => toggleOrder()} className={styles['navbar-shopping-cart']}>
            <Image src={shoppingCart} alt="shopping cart" />
            {state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
          </button>
        </li>
      </ul>
    </nav>
  );
}
