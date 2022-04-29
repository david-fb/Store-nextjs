import ProductList from '@containers/ProductList';
import Head from 'next/head';
import CategoryList from '@containers/CategoryList';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Hero from '@components/Hero';
import PawPatrolImage from '@images/PawPatrol2.png';

export default function Home() {
  const { data: products } = useFetch(endPoints.products.allProducts);

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <Hero title={'Collection PawPatrol'} info={'lorem Ipsum'} image={PawPatrolImage.src} hasButton={true} />
      <CategoryList />
      <ProductList products={products?.rows} title={'Catalog'} />
    </>
  );
}
