import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { changePasswordSchema } from '@schemas/recoverySchema';
import { changePasswordFromToken } from '@services/api/recoveryPassword';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SimpleHeader from '@common/SimpleHeader';
import recoveryIcon from '@icons/reset-password.png';
import styles from '@styles/NewPassword.module.scss';

export default function RecoveryToken({ token }) {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [tokenError, setTokenError] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [counter, setCounter] = useState(5);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      token: token,
    },
    resolver: joiResolver(changePasswordSchema),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (confirmPassword && newPassword) {
        if (confirmPassword === newPassword) {
          setPasswordsMatch(true);
        } else {
          setPasswordsMatch(false);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmPassword, newPassword]);

  const onSubmit = (data) => {
    if (passwordsMatch) {
      changePasswordFromToken(data)
        .then((res) => {
          setTokenError(false);
          if (res === 200) {
            setIsPasswordChanged(true);
          }
          if (!res) {
            console.error(`An error occurred`);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            setTokenError(true);
          }
        });
    }
  };

  useEffect(() => {
    if (counter > 0 && isPasswordChanged) {
      const timeout = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timeout);
    }
    counter === 0 && router.push('/login');
  }, [counter, isPasswordChanged]);

  return (
    <>
      <Head>
        <title>Next Shop - Change password</title>
      </Head>
      <section className={styles['NewPassword']}>
        <SimpleHeader title={'Change password'} color={'green'} image={recoveryIcon} />
        {!isPasswordChanged ? (
          <div className={styles['NewPassword-container']}>
            <p className={styles['subtitle']}>Enter a new password for you account</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
              <label htmlFor="newPassword" className={styles['label']}>
                New Password
              </label>
              <input
                {...register('newPassword', { onChange: (e) => setNewPassword(e.target.value) })}
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="*********"
                className={styles['input'] + ' ' + styles['input-password']}
              />

              <p className="error-message">{errors?.newPassword?.message}</p>
              <label htmlFor="new-password" className={styles['label']}>
                Confirm Password
              </label>
              <p className="error-message">{errors?.token?.message}</p>
              <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="new-password" placeholder="*********" className={styles['input'] + ' ' + styles['input-password']} />
              {!passwordsMatch && <p className="error-message">Passwords do not match</p>}
              <button type="submit" className={`primary-button ${styles['confirm-button']}`}>
                Confirm
              </button>
            </form>
            {tokenError && <p className="error-message">Token has expired</p>}
          </div>
        ) : (
          <div className={styles['NewPassword-changed']}>
            <p>successful password change</p>
            <Link href="/login">
              <a href="dummy" className={`primary-button ${styles['link']}`}>
                Login
              </a>
            </Link>
            <p>will be redirected in {counter}</p>
          </div>
        )}
      </section>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { token } = context.query;
  return {
    props: {
      token,
    },
  };
};
