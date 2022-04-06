import React from 'react';
import Head from 'next/head';
import styles from '@styles/CreateAccount.module.scss';
import lockImage from '@images/lock.png'

const CreateAccount = () => {
	return (
		<>	
		<Head>
			<title>Next Shop - Create Account</title>
		</Head>
			<div className={styles["CreateAccount"]}>
				<div className={styles["Login-header"]}>
					<h2>Crear Cuenta</h2>
					<img src={lockImage.src}/>
				</div>
				<div className={styles["CreateAccount-container"]}>
					<form action="/" className={styles["form"]}>
						<div>
							<label for="name" className={styles["label"]}>Name</label>
							<input type="text" id="name" placeholder="Name" className={styles["input"] + " " + styles["input-name"]} />
							<label for="email" className={styles["label"]}>Email</label>
							<input type="text" id="email" placeholder="correo@example.com" className={styles["input"] + " " + styles["input-email"]} />
							<label for="password" className={styles["label"]}>Password</label>
							<input type="password" id="password" placeholder="*********" className={styles["input"] + " " + styles["input-password"]} />
						</div>
						<input type="submit" value="Create" className={styles["create-button"] + " " + "primary-button" } />
					</form>
				</div>
			</div>
		</>
	);
}

export default CreateAccount;