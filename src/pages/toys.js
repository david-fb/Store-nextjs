import ProductList from '@containers/ProductList';
import Head from 'next/head';
import PawPatrolImage from '@images/Chase.png';
import styles from '@styles/Home.module.scss';
import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';

export default function Toys() {
  const category = useFetch(endPoints.categories.getCategory(2));
  return (
    <>
      <Head>
        <title>React Shop - Toys</title>
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
        <ProductList products={category?.products}/>
    </>
  );
}