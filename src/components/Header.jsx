import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@components/Menu';
import MyOrder from '@containers/MyOrder';
import menu from '@icons/icon_menu.svg';
import logo from '@logos/logo_yard_sale.svg';
import AppContext from '@context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import styles from '@styles/Header.module.scss';
import { useRouter } from 'next/router'

const Header = () => {
	const { state, toggleOrder, toggleMenu } = useContext(AppContext);
	const router = useRouter();

	return (
		<>
			<nav className={styles.Nav}>
				<img src={menu.src} alt="menu" className={styles.menu}/>
				<h1 className={styles.title}>store</h1>
				<div className={styles["navbar-left"]}>
					<ul>
						<li className={styles[router.pathname == "/" ? "active" : ""]}>
							<Link href="/">Inicio</Link>
						</li>
						<li className={styles[router.pathname == "/toys" ? "active" : ""]}>
							<Link href="/toys">Juguetes</Link>
						</li>
						<li className={styles[router.pathname == "/care-and-maternity" ? "active" : ""]}>
							<Link href="/care-and-maternity">Cuidado y Maternidad</Link>
						</li>
						<li className={styles[router.pathname == "/clothes" ? "active" : ""]}>
							<Link href="/clothes">Ropa</Link>
						</li>
					</ul>
				</div>
				<div className={styles["navbar-right"]}>
					<ul>
						<li className={styles["more-clickable-area"] + " " + styles["navbar-email"]}>
							<button onClick={() => toggleMenu()}>platzi@example.com</button>
						</li>
						<li className={styles["navbar-shopping-cart"]}>
							<button onClick={() => toggleOrder() }>
								<Image className={styles["more-clickable-area"]} src={shoppingCart} alt="shopping cart" />
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
