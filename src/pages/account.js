import { useState, useEffect } from 'react';
import Head from 'next/head';
import SimpleHeader from '@common/SimpleHeader';
import userImage from '@images/personal-data.png';
import styles from '@styles/MyAccount.module.scss';
import { getSession } from 'next-auth/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { updateCustomerSchema } from '@schemas/customerSchema';
import { useForm } from 'react-hook-form';
import { updateCustomer } from '@services/api/customer.js';

const MyAccount = ({ user, token }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(updateCustomerSchema),
  });

  useEffect(()=> {
    if(!isEdit){
      reset();
    }
  }, [isEdit])

  const onSubmit = (data) => {
    updateCustomer(user?.id, data, token)
      .then((res) => {
        alert('Successful user registration!');
        setUserData(res);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEdit(false);
      });
  };

  return (
    <>
      <Head>
        <title>Next Shop - My account</title>
      </Head>
      <div className={styles['MyAccount']}>
        <SimpleHeader title={'My Account'} color={'blue'} image={userImage} />
        <div className={styles['MyAccount-container']}>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div>
              <label htmlFor="name" className={styles['label']}>
                Name
              </label>
              {!isEdit ? (
                <p className={styles['value']}>{userData?.name}</p>
              ) : (
                <>
                  <input {...register('name')} type="text" name="name" defaultValue={userData?.name} />
                  <p>{errors?.name?.message}</p>
                </>
              )}

              <label htmlFor="lastName" className={styles['label']}>
                Last name
              </label>
              {!isEdit ? (
                <p className={styles['value']}>{userData?.lastName}</p>
              ) : (
                <>
                  <input {...register('lastName')} type="text" name="lastName" defaultValue={userData?.lastName} />
                  <p>{errors?.lastName?.message}</p>
                </>
              )}

              <label htmlFor="phone" className={styles['label']}>
                Phone
              </label>
              {!isEdit ? (
                <p className={styles['value']}>{userData?.phone}</p>
              ) : (
                <>
                  <input {...register('phone')} type="text" name="phone" defaultValue={userData?.phone} />
                  <p>{errors?.phone?.message}</p>
                </>
              )}

              <label htmlFor="email" className={styles['label']}>
                Email
              </label>
              <p className={styles['value']}>{userData?.email}</p>

              <label htmlFor="password" className={styles['label']}>
                Password
              </label>
              <p className="value">*********</p>
            </div>
            {!isEdit ? (
              <button onClick={() => setIsEdit(!isEdit)} type="button" className={styles['secondary-button']}>
                Edit
              </button>
            ) : (
              <div>
                <button onClick={() => setIsEdit(false)} type="button" className={styles['secondary-button']}>
                  Cancel
                </button>
                <button type="submit" className={styles['secondary-button']}>
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session && !session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
      token: session.token,
    },
  };
};

export default MyAccount;
