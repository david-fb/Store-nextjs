import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/Login.module.scss';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import lockImage from '@images/log-in.png';
import SimpleHeader from '@common/SimpleHeader';

const Login = () => {
  const form = useRef(null);
  const [errorLogin, setErrorLogin] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${router.basePath}`,
    });
    if (res?.error) {
      setErrorLogin('Email or password incorrect');
    }
    if (res?.url) router.push(res.url);
  };

  return (
    <>
      <Head>
        <title>Next Shop - Log In</title>
      </Head>
      <div className={styles['Login']}>
        <SimpleHeader title={'Log In'} image={lockImage} color={'green2'} />
        <div className={styles['Login-container']}>
          {errorLogin && <p className={'error-message'}>{errorLogin}</p>}
          <form action="/" className={styles['form']} ref={form}>
            <label htmlFor="email" className={styles['label']}>
              Email address
            </label>
            <input type="text" name="email" placeholder="email@example.com" className={styles['input'] + ' ' + styles['input-email']} />
            <label htmlFor="password" className={styles['label']}>
              Password
            </label>
            <input type="password" name="password" placeholder="*********" className={styles['input'] + ' ' + styles['input-password']} />
            <button onClick={handleSubmit} className={'primary-button' + ' ' + styles['login-button']}>
              Log in
            </button>
            <Link href="/password-recovery">
              <a href="dummy">Forgot my password</a>
            </Link>
          </form>
          <Link href="/signup">
            <a href="dummy" className={styles['secondary-button']}>
              Sign up
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
