import ProductList from '@containers/ProductList';
import Head from 'next/head';
export default function Clothes() {
  return (
    <>
      <Head>
        <title>React Shop</title>
      </Head>
      <ProductList />
    </>
  );
}