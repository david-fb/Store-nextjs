import { useState, useEffect } from 'react';
import ProductList from '@containers/ProductList';
import Head from 'next/head';
import CategoryList from '@containers/CategoryList';
import styles from '@styles/Home.module.scss';
import axios from 'axios';
import endPoints from '@services/api';
import Hero from '@components/Hero';
import PawPatrolImage from '@images/PawPatrol2.png';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios(endPoints.products.allProducts);
        setProducts(response?.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, [])

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <Hero title={'Collection PawPatrol'} info={'lorem Ipsum'} image={PawPatrolImage.src} hasButton={true}/>
      <CategoryList />
      <ProductList products={products?.rows} title={'Catalog'}/>
    </>
  );
}
