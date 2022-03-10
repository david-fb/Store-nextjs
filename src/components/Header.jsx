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

const Header = () => {
	const { state, toggleOrder, toggleMenu } = useContext(AppContext);

	return (
		<>
			<nav className={styles.Nav}>
				<img src={menu.src} alt="menu" className={styles.menu} width={25} height={21}/>
				<div className={styles["navbar-left"]}>
					<Link href="/" passHref>
						<img src={logo.src} alt="logo" className={styles["nav-logo"]}/>
					</Link>
					<ul>
						<li>
							<Link href="/all">All</Link>
						</li>
						<li>
							<Link href="/">Clothes</Link>
						</li>
						<li>
							<Link href="/">Electronics</Link>
						</li>
						<li>
							<Link href="/">Furnitures</Link>
						</li>
						<li>
							<Link href="/">Toys</Link>
						</li>
						<li>
							<Link href="/">Others</Link>
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
