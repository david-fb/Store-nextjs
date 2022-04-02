import React, { useContext, useEffect, useState } from 'react';
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
import endPoints from '@services/api';
import axios from 'axios';

const Header = () => {
	const { state, toggleOrder, toggleMenu } = useContext(AppContext);
	const { data: session } = useSession();
	const router = useRouter();
	const [user, setUser] = useState({});
	
	useEffect(()=> {
		async function getUser(){
			try {
				const res = await axios(endPoints.users.getCustomer(session?.user.id));
				setUser(res.data)
			} catch (error) {
				console.log(error);
			}
		};
		if (session?.user) getUser();
	}, [session?.user]);

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
						{session?.user ? (
							<li className={styles["navbar-email"]}>
								<button onClick={() => toggleMenu()}>{`${user?.name} ${user?.lastName}`}</button>
							</li>
						)
						: (
							<Link href={"/login"}>Log in</Link>
						)
						}
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
