import ProductList from '@containers/ProductList';
import Head from 'next/head';
import SkyeImage from '@images/Skye.png';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Hero from '@components/Hero';

export default function careAndMaternity() {
  const category = useFetch(endPoints.categories.getCategory(3))
  return (
    <>
      <Head>
        <title>Next Shop - Care & Maternity</title>
      </Head>
      <Hero title={"Collection PawPatrol"} info={'Lorem Ipsum'}  image={SkyeImage.src} color={'pink'} hasButton={true}/>
      <ProductList products={category?.products} paddingTop={15}/>
    </>
  );
}