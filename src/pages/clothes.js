import ProductList from '@containers/ProductList';
import Head from 'next/head';
import PawPatrolImage from '@images/Marshall.png';
import styles from '@styles/Home.module.scss';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';

export default function Clothes() {
  const category = useFetch(endPoints.categories.getCategory(1));
  return (
    <>
      <Head>
        <title>React Shop - Clothes</title>
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