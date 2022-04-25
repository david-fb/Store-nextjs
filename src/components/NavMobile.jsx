import { useContext, useEffect, createRef } from 'react';
import AppContext from '@context/AppContext';
import MenuMobile from './MenuMobile';
import Image from 'next/image';
import Link from 'next/link';
import menu from '@icons/icon_menu.svg';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import NextJSIcon from '@icons/next-js.svg';
import styles from '@styles/NavMobile.module.scss';

export default function NavMobile() {
  const { state, toggleOrder, toggleMenuMobile } = useContext(AppContext);

  return (
    <section className={styles['navbarMobile']}>
      <button onClick={toggleMenuMobile} className={styles['navbarMobile-menu']}>
        <Image src={menu} alt="menu" />
      </button>
      <Link href={'/'}>
        <figure className={styles['navbarMobile-logo']} title="Next Shop">
          <Image src={NextJSIcon} layout="fill"></Image>
        </figure>
      </Link>
      <button onClick={toggleOrder} className={styles['navbar-shopping-cart']}>
        <Image src={shoppingCart} alt="shopping cart" />
        {state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
      </button>
      {state.menuMobileIsOpen && <MenuMobile/>}
    </section>
  );
}
