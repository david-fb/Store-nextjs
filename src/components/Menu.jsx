import React from 'react';
import styles from '@styles/Menu.module.scss';
import { signOut } from 'next-auth/react';


const Menu = () => {
	return (
		<div className={styles.Menu}>
			<a href="/orders" className={styles["Menu-item"]}>My orders</a>
			<a href="/account" className={styles["Menu-item"]}>My account</a>
			<button onClick={signOut} className={styles["Menu-item"]}>Sign out</button>
		</div>
	);
}

export default Menu;
