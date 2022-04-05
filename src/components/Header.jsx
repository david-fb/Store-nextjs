import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@components/Menu';
import MyOrder from '@containers/MyOrder';
import menu from '@icons/icon_menu.svg';
import AppContext from '@context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import styles from '@styles/Header.module.scss';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import userIcon from '@icons/user_icon.svg';
import arrowDown from '@icons/arrow-down.svg';

const Header = () => {
  const { state, toggleOrder, toggleMenu } = useContext(AppContext);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <nav className={styles.Nav}>
        <img src={menu.src} alt="menu" className={styles.menu} />
        <h1 className={styles.title}>store</h1>
        <div className={styles['navbar-left']}>
          <ul>
            <li className={styles[router.pathname == '/' ? 'active' : '']}>
              <Link href="/">Inicio</Link>
            </li>
            <li className={styles[router.pathname == '/toys' ? 'active' : '']}>
              <Link href="/toys">Juguetes</Link>
            </li>
            <li className={styles[router.pathname == '/care-and-maternity' ? 'active' : '']}>
              <Link href="/care-and-maternity">Cuidado y Maternidad</Link>
            </li>
            <li className={styles[router.pathname == '/clothes' ? 'active' : '']}>
              <Link href="/clothes">Ropa</Link>
            </li>
          </ul>
        </div>
        <div className={styles['navbar-right']}>
          <ul>
            {session?.user ? (
              <li className={styles['navbar-userName']}>
                <button onClick={() => toggleMenu()}>
                  <Image src={userIcon} width={25} height={25}></Image>
                  {`${session.user.customer.name} ${session.user.customer.lastName}`}
                  <Image src={arrowDown} width={20} height={10}></Image>
                </button>
              </li>
            ) : (
              <Link href={'/login'}>Log in</Link>
            )}
            <li className={styles['navbar-shopping-cart']}>
              <button onClick={() => toggleOrder()}>
                <Image src={shoppingCart} alt="shopping cart" />
                {state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
              </button>
            </li>
          </ul>
        </div>
        {state.menuIsOpen && <Menu />}
      </nav>
      {state.orderIsOpen && <MyOrder />}
    </>
  );
};

export default Header;
