import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { recoveryPasswordSchema } from '@schemas/recoverySchema';
import { sendRecoveryMail } from '@services/api/recoveryPassword';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SimpleHeader from '@common/SimpleHeader';
import recoveryIcon from '@icons/unlocked.png';
import styles from '@styles/PasswordRecovery.module.scss';

const PasswordRecovery = () => {
  const router = useRouter();
  const HOSTNAME = process.env.NEXT_NEXT_PUBLIC_HOST_PROD ?? process.env.NEXT_PUBLIC_HOST_DEV;

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
    sendRecoveryMail(data).then((status) => {
      if (status === 200) {
        alert('Mail sent');
      }
    });
  };

  return (
    <>
      <Head>
        <title>Next Shop - Password recovery</title>
      </Head>
      <div className={styles['PasswordRecovery']}>
        <SimpleHeader color={'green'} title={'Password recovery'} image={recoveryIcon} />
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
      </div>
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
