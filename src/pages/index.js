import { useContext } from 'react';
import AppContext from '@context/AppContext';
import ProductList from '@containers/ProductList';
import Head from 'next/head';
import PawPatrolImage from '@images/PawPatrol2.png';
import CategoryList from '@containers/CategoryList';
import styles from '@styles/Home.module.scss';

export default function Home() {
	const { state } = useContext(AppContext)
  return (
    <>
      <Head>
        <title>React Shop</title>
      </Head>
      <div className={styles["header-container"]}>
        <div className={styles["header-content"]}>
          <div className={styles["content-text"]}>
            <h2>Collection PawPatrol</h2>
            <p>Lorem ipsum</p>
            <button className='primary-button'>MORE DETAILS</button>
          </div>
          <img src={PawPatrolImage.src}/>
        </div>
      </div>
      <CategoryList />
      <ProductList products={state.products}/>
    </>
  );
}
