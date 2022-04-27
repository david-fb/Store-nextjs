import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { changePasswordSchema } from '@schemas/recoverySchema';
import { changePasswordFromToken } from '@services/api/recoveryPassword';
import { getSession } from 'next-auth/react';
import SimpleHeader from '@common/SimpleHeader';
import recoveryIcon from '@icons/reset-password.png';
import styles from '@styles/NewPassword.module.scss';

export default function RecoveryToken({token}) {
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

  const onSubmit = (data) => {
    changePasswordFromToken(data).then(res => {
        if(res === 200){
            alert('Password changed');
        }
        if(!res){
            console.error(`An error occurred`);
        }
    });
  };

  return (
    <>
      <Head>
        <title>Next Shop - Change password</title>
      </Head>
      <div className={styles['NewPassword']}>
        <SimpleHeader title={'Change password'} color={'green'} image={recoveryIcon}/>
        <div className={styles['NewPassword-container']}>
          <p className={styles['subtitle']}>Enter a new passwrd for you account</p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
            <label htmlFor="password" className={styles['label']}>
              New Password
            </label>
            <input {...register('newPassword')} type="password" id="password" placeholder="*********" className={styles['input'] + ' ' + styles['input-password']} />

            <p>{errors?.newPassword?.message}</p>
            <label htmlFor="new-password" className={styles['label']}>
              Confirm Password
            </label>
            <p>{errors?.token?.message}</p>
            <input type="password" id="new-password" placeholder="*********" className={styles['input'] + ' ' + styles['input-password']} />
            <button type="submit" className={`primary-button ${styles['confirm-button']}`}>
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if(session && session.user){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    const { token } = context.query;
    return {
        props: {
            token,
        }
    }
};