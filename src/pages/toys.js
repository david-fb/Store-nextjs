import ProductList from '@containers/ProductList';
import Head from 'next/head';
import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import Hero from '@components/Hero';
import ChaseImage from '@images/Chase.png';

export default function Toys() {
  const { data: category } = useFetch(endPoints.categories.getCategory(2));
  return (
    <>
      <Head>
        <title>Next Shop - Toys</title>
      </Head>
      <Hero title={'Collection PawPatrol'} info={'Lorem ipsum'} image={ChaseImage.src} color={'blue-light'} hasButton={true} />
      <ProductList products={category?.products} paddingTop={14} />
    </>
  );
}
