import Header from '@components/Header';
import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import { SessionProvider } from 'next-auth/react';
import '@styles/globals.scss';
import Footer from '@components/Footer';

function MyApp({ Component, pageProps }) {
  const initialState = useInitialState();
  return (
    <SessionProvider>
      <AppContext.Provider value={initialState}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
