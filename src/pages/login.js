import React, { useRef } from 'react';
import Link from 'next/link';
import styles from '@styles/Login.module.scss';
import logo from '@logos/logo_yard_sale.svg';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
	const form = useRef(null);
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(form.current);
		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		}
		const res = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
			callbackUrl: `${router.basePath}`
		});
		if(res?.error) {
			console.log(res.error);
		}
		if(res?.url) router.push(res.url);
	}

	return (
		<div className={styles["Login"]}>
			<div className={styles["Login-container"]}>
				<img src={logo.src} alt="logo" className={styles["logo"]} />
				<form action="/" className={styles["form"]} ref={form}>
					<label htmlFor="email" className={styles["label"]}>Email address</label>
					<input type="text" name="email" placeholder="platzi@example.cm" className={styles["input"] + " " + styles["input-email"]} />
					<label htmlFor="password" className={styles["label"]}>Password</label>
					<input type="password" name="password" placeholder="*********" className={styles["input"] + " " + styles["input-password"]} />
					<button
						onClick={handleSubmit}
						className={styles["primary-button"] + " " + styles["login-button"]}>
						Log in
					</button>
					<a href="/password-recovery">Forgot my password</a>
				</form>
				<Link href="/singup"
					className={styles["secondary-button"] + " " + styles["signup-button"]}
				>
					Sign up
				</Link>
			</div>
		</div >
	);
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	if(session && session.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			}
		}
	}
	return {
		props: {}
	}
};

export default Login;
