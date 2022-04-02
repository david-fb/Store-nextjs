import React from 'react';
import styles from '@styles/Menu.module.scss';
import { signOut } from 'next-auth/react';


const Menu = () => {
	return (
		<div className={styles.Menu}>
			<ul>
				<li>
					<a href="/orders" className={styles["title"]}>My orders</a>
				</li>
				<li>
					<a href="/account">My account</a>
				</li>
				<li>
					<button onClick={signOut}>Sign out</button>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
