import Header from '@components/Header';
import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import useGetProducts from '@hooks/useGetProducts';
import '@styles/globals.scss';
import Footer from '@components/Footer';

const API = 'https://plat-express-store.herokuapp.com/api/v1/products';

function MyApp({ Component, pageProps }) {
  const products = useGetProducts(API);
  const initialState = useInitialState(products);
  return (
    <AppContext.Provider value={initialState}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AppContext.Provider>
  );
}

export default MyApp;
