import ProductList from '@containers/ProductList';
import Head from 'next/head';
import MarshallImage from '@images/Marshall.png';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Hero from '@components/Hero';

export default function Clothes() {
  const category = useFetch(endPoints.categories.getCategory(1));
  return (
    <>
      <Head>
        <title>Next Shop - Clothes</title>
      </Head>
      <Hero image={MarshallImage.src} title={"Collection PawPatrol"} info={'Lorem Ipsum'} color={'red'} hasButton={true}/>
      <ProductList products={category?.products}/>
    </>
  );
}