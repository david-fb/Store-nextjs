import React from 'react';
import OrderItem from '@components/OrderItem';
import styles from '@styles/Orders.module.scss';
import { getSession } from 'next-auth/react';
import { getAllOrders } from '@services/api/order';

const Orders = ({orders}) => {
	console.log(orders);
	return (
		<div className={styles["Orders"]}>
			<div className={styles["Orders-container"]}>
				<h1 className={styles["title"]}>My orders</h1>
				<div className={styles["Orders-content"]}>
					{/* <OrderItem /> */}
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	if(!session && !session.user){
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			}
		}
	}

	const orders = await getAllOrders(session.token); 

	return {
		props: {
			orders: orders,
		}
	}

}

export default Orders;
