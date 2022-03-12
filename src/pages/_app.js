import Header from '@components/Header';
import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import useGetDataFromAPI from '@hooks/useGetDataFromAPI';
import '@styles/globals.scss';
import Footer from '@components/Footer';

const API = 'https://plat-express-store.herokuapp.com/api/v1';
const productsAPI = `${API}/products`;
const categoriesAPI = `${API}/categories`

function MyApp({ Component, pageProps }) {
  const products = useGetDataFromAPI(productsAPI);
  const categories = useGetDataFromAPI(categoriesAPI)
  const initialState = useInitialState(products, categories);
  return (
    <AppContext.Provider value={initialState}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AppContext.Provider>
  );
}

export default MyApp;
