import { useContext } from 'react';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import userIcon from '@icons/user_icon.svg';
import arrowDown from '@icons/arrow-down.svg';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import NextJSIcon from '@icons/next-js.svg';
import styles from '@styles/Nav.module.scss';

export default function Nav() {
  const { state, toggleOrder, toggleMenu } = useContext(AppContext);
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className={styles['navbar']}>
      <Link href={'/'}>
        <figure className={styles['navbar-logo']} title="Next Shop">
          <Image src={NextJSIcon} layout="fill"></Image>
        </figure>
      </Link>
      <ul className={styles['navbar-left']}>
        <li className={styles[router.pathname == '/' ? 'active' : '']}>
          <Link href="/">Inicio</Link>
        </li>
        <li className={styles[router.pathname == '/toys' ? 'active' : '']}>
          <Link href="/toys">Juguetes</Link>
        </li>
        <li className={styles[router.pathname == '/care-and-maternity' ? 'active' : '']}>
          <Link href="/care-and-maternity">Cuidado</Link>
        </li>
        <li className={styles[router.pathname == '/clothes' ? 'active' : '']}>
          <Link href="/clothes">Ropa</Link>
        </li>
      </ul>

      <ul className={styles['navbar-right']}>
        {session?.user ? (
          <li className={styles['navbar-userName']}>
            <button onClick={() => toggleMenu()}>
              <Image src={userIcon} width={25} height={25} />
              {`${session.user.name} ${session.user.lastName}`}
              <Image src={arrowDown} width={20} height={10} />
            </button>
          </li>
        ) : (
          <li className={styles['navbar-access']}>
            <a href={'/login'}>Log in</a>
            <a href={'/signup'}>Register</a>
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
