import Header from '@components/Header';
import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import { SessionProvider } from 'next-auth/react';
import '@styles/globals.scss';
import Footer from '@components/Footer';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const initialState = useInitialState();
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <AppContext.Provider value={initialState}>
        {router.pathname !== '/404' && <Header />}
        <Component {...pageProps} />
        <Footer />
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
