import React, { useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { createCustomerSchema } from '@schemas/customerSchema';
import { addCustomer } from '@services/api/customer.js';
import styles from '@styles/CreateAccount.module.scss';
import lockImage from '@images/sign-up.png';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SimpleHeader from '@common/SimpleHeader';

const CreateAccount = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(createCustomerSchema),
  });

  const [emailError, setEmailError] = useState(null);

  const onSubmit = (data) => {
    addCustomer(data)
      .then(() => {
        alert('Successful user registration!');
        router.push('/login');
      })
      .catch((err) => {
        if (err.response.status === 409) setEmailError('email already exists');
      });
  };

  return (
    <>
      <Head>
        <title>Next Shop - Create Account</title>
      </Head>
      <div className={styles['CreateAccount']}>
        <SimpleHeader title={'Register'} image={lockImage} color={'skyblue'} />
        <div className={styles['CreateAccount-container']}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
            <div>
              <div className={styles['form-item']}>
                <label htmlFor="name" className={styles['label']}>
                  Name
                </label>
                <input {...register('name')} type="text" id="name" placeholder="Name" className={styles['input'] + ' ' + styles['input-name']} />
                <p className="error-message">{errors?.name?.message}</p>
              </div>

              <div className={styles['form-item']}>
                <label htmlFor="lastName" className={styles['label']}>
                  Last name
                </label>
                <input {...register('lastName')} type="text" id="lastName" placeholder="last name" className={styles['input'] + ' ' + styles['input-name']} />
                <p className="error-message">{errors?.lastName?.message}</p>
              </div>

              <div className={styles['form-item']}>
                <label htmlFor="phone" className={styles['label']}>
                  Phone
                </label>
                <input {...register('phone')} type="text" id="phone" placeholder="phone" className={styles['input'] + ' ' + styles['input-name']} />
                <p className="error-message">{errors?.phone?.message}</p>
              </div>

              <div className={styles['form-item']}>
                <label htmlFor="email" className={styles['label']}>
                  Email
                </label>
                <input {...register('user.email')} type="text" id="email" placeholder="correo@example.com" className={styles['input'] + ' ' + styles['input-email']} />
                {emailError && <p className="error-message">{emailError}</p>}
                <p className="error-message">{errors?.user?.email?.message}</p>
              </div>

              <div className={styles['form-item']}>
                <label htmlFor="password" className={styles['label']}>
                  Password
                </label>
                <input {...register('user.password')} type="password" id="password" placeholder="*********" className={styles['input'] + ' ' + styles['input-password']} />
                <p className="error-message">{errors?.user?.password?.message}</p>
              </div>
            </div>
            <input type="submit" value="Create" className={styles['create-button'] + ' ' + 'primary-button'} />
          </form>
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

export default CreateAccount;
