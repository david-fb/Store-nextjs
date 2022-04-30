import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { recoveryPasswordSchema } from '@schemas/recoverySchema';
import { sendRecoveryMail } from '@services/api/recoveryPassword';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import SimpleHeader from '@common/SimpleHeader';
import recoveryIcon from '@icons/unlocked.png';
import styles from '@styles/PasswordRecovery.module.scss';
import email from '@icons/email.svg';
import LoadingCircle from '@common/loadingCircle';

const PasswordRecovery = () => {
  const router = useRouter();
  const HOSTNAME = process.env.NEXT_NEXT_PUBLIC_HOST_PROD ?? process.env.NEXT_PUBLIC_HOST_DEV;
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recoveryUri: `${HOSTNAME}${router.asPath}/`,
    },
    resolver: joiResolver(recoveryPasswordSchema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    sendRecoveryMail(data).then((status) => {
      if (status === 200) {
        setIsLoading(false);
        setIsEmailSent(true);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Next Shop - Password recovery</title>
      </Head>
      <SimpleHeader color={'green'} title={'Password recovery'} image={recoveryIcon} />
      <section className={styles['PasswordRecovery']}>
        {isLoading && (
          <div className={styles['PasswordRecovery-loading']}>
            <LoadingCircle />
          </div>
        )}
        {!isEmailSent && !isLoading && (
          <div className={styles['PasswordRecovery-container']}>
            <p className={styles['subtitle']}>Inform the email address used to create your account</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
              <label htmlFor="email" className={styles['label']}>
                Email address
              </label>
              <input {...register('email')} type="text" id="email" className={styles['input'] + ' ' + styles['input-email']} />
              <p>{errors?.email?.message}</p>
              <button type="submit" className={`primary-button ${styles['button-confirm']}`}>
                Confirm
              </button>
            </form>
          </div>
        )}
        {isEmailSent && !isLoading && (
          <div className={styles['SendEmail-container']}>
            <h2 className={styles['title']}>Email has been sent!</h2>
            <p className={styles['subtitle']}>Please check your inbox for instructions on how to reset the password</p>
            <div className={styles['email-image']}>
              <figure>
                <Image src={email.src} alt="email" layout="fill" />
              </figure>
            </div>
            <Link href="/login">
              <a href="dummy" className={`primary-button ${styles['link']}`}>
                Login
              </a>
            </Link>
            <p className={styles['resend']}>
              <span>Didn&apos;t receive the email?</span>
              <button onClick={handleSubmit(onSubmit)} className={`${styles['resend-button']}`}>
                Resend
              </button>
            </p>
          </div>
        )}
      </section>
    </>
  );
};

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
  return {
    props: {},
  };
};

export default PasswordRecovery;
