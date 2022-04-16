import endPoints from '@services/api';
import { useContext } from 'react';
import Head from 'next/head';
import axios from 'axios';
import SimpleHeader from '@common/SimpleHeader';
import styles from '@styles/Product.module.scss';
import addToCart from '@icons/bt_add_to_cart.svg';
import AppContext from '@context/AppContext';

export default function Product({ product }) {
  const { state, addToCart } = useContext(AppContext);
  let inCart = state?.cart.some((item) => item['id'] === product.id);
  const handleClick = (item) => {
    if (!inCart) {
      addToCart(item);
    }
  };
  return (
    <>
      <Head>
        <title>Next Shop - {product.name}</title>
      </Head>
      <SimpleHeader color={'skyblue'} />
      <div className={styles['Product-container']}>
        <div className={styles['Product-content']}>
          <div className={styles['Product-Image']}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles['Product-info']}>
            <h2>{product.name}</h2>
            <p className={styles['Price']}>${product.price}</p>
            <button onClick={() => handleClick(product)} className={`primary-button ${styles['add-to-cart-btn']}  ${inCart ? styles['added-to-cart-btn'] : ''}`}>
              <span>+</span>
              ADD TO CART
            </button>
            <h3>Description</h3>
            <p className={styles['Description']}>{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { productId } = context.query;
    const { data: product } = await axios.get(endPoints.products.getProduct(productId));
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
