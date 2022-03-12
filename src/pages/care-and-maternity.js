import useGetDataFromAPI from '@hooks/useGetDataFromAPI';
import ProductList from '@containers/ProductList';
import Head from 'next/head';
import PawPatrolImage from '@images/Skye.png';
import styles from '@styles/Home.module.scss';

export default function careAndMaternity() {
  const data = useGetDataFromAPI("https://plat-express-store.herokuapp.com/api/v1/categories/3");
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
      <ProductList products={data.products}/>
    </>
  );
}