import React from 'react';
import Link from 'next/link';
import menu from '@icons/icon_menu.svg';
import styles from '@styles/Footer.module.scss';
import { useRouter } from 'next/router'

const Footer = () => {
	const router = useRouter();

	return (
		<div className={styles.Footer}>
			<nav className={styles["Footer-nav"]}>
				<h1 className={styles.title}>store</h1>
                <ul>
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li>
                        <Link href="/toys">Juguetes</Link>
                    </li>
                    <li>
                        <Link href="/care-and-maternity">Cuidado y Maternidad</Link>
                    </li>
                    <li>
                        <Link href="/clothes">Ropa</Link>
                    </li>
                </ul>
			</nav>
		</div>
	);
};

export default Footer;
