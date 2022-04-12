import React from 'react';
import Head from 'next/head';
import styles from '@styles/Orders.module.scss';
import checklistImage from '@images/checklist.png';
import { getSession } from 'next-auth/react';
import { getAllOrders } from '@services/api/order';
import SimpleHeader from '@common/SimpleHeader';
import OrderInfo from '@components/OrderInfo';

const Orders = ({ orders }) => {
  console.log(orders);
  return (
    <>
      <Head>
        <title>Next Shop - My Orders</title>
      </Head>
      <div className={styles['Orders']}>
        <SimpleHeader title={'My orders'} image={checklistImage} color={'green2'} />
        <div className={styles['Orders-container']}>
          <div className={styles['Orders-content']}>
            {orders?.map((order) => (
              <OrderInfo items={order?.items} total={order?.total} key={`Order-${order?.id}`} date={order?.createdAt}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session && !session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const orders = await getAllOrders(session.token);

  return {
    props: {
      orders: orders,
    },
  };
};

export default Orders;
