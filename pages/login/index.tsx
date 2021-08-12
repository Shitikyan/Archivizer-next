import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Link } from '../../shared/Link';

import styles from './styles.module.css';

interface ILoginFormInputs {
  emailAddress: string;
  password: string;
  agreement: boolean;
}

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormInputs>();
  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => console.log(data);

  return (
    <div className={styles.loginContainer}>
      <div>
        <div className='flex items-center justify-center'>
          <div className={styles.avImage}>AV</div>
        </div>
        <div className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200'>
          Sign in to your account
        </div>
        <div className={styles.newAccount}>
          <span className='font-medium text-gray-600'>Or</span>
          <span>
            <Link
              href='default.asp'
              target='_blank'
              className='hover:text-blue-500 font-bold'
            >
              create new account
            </Link>
          </span>
        </div>
      </div>
      <form className={`${styles.form} flex`} onSubmit={handleSubmit(onSubmit)}>
        <label
          className='block text-sm font-medium text-gray-700 dark:text-gray-300 font-semibold'
          htmlFor='emailAddress'
        >
          Email address
        </label>
        <Controller
          name='emailAddress'
          control={control}
          defaultValue=''
          rules={{ required: true }}
          render={({ field }) => (
            <TextField id='emailAddress' variant='outlined' {...field} />
          )}
        />
        {errors.emailAddress && (
          <span className='text-red-500'>This field is required</span>
        )}
        <label
          className='block text-sm font-medium text-gray-700 dark:text-gray-300 font-semibold'
          htmlFor='password'
        >
          Password
        </label>
        <Controller
          name='password'
          control={control}
          defaultValue=''
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id='password'
              type='password'
              variant='outlined'
              {...field}
            />
          )}
        />
        {errors.password && (
          <span className='text-red-500'>This field is required</span>
        )}
        <div style={{ marginTop: 10 }}>
          <Link
            href='default.asp'
            target='_blank'
            className='hover:text-blue-500 font-semibold flex justify-end'
          >
            Forgot your password?
          </Link>
        </div>
        <div className='flex'>
          <Controller
            name='agreement'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Checkbox color='primary' id='agreement' {...field} />
            )}
          />
          <label htmlFor='agreement' style={{ marginTop: 7 }}>
            <div className='my-22'>
              I confirm that i have read and agree to{' '}
              <Link
                href='default.asp'
                target='_blank'
                className='hover:text-blue-500 font-bold'
              >
                Payment
              </Link>
              ,
              <div>
                <Link
                  href='default.asp'
                  target='_blank'
                  className='hover:text-blue-500 font-bold'
                >
                  Refund
                </Link>{' '}
                and{' '}
                <span>
                  <Link
                    href='default.asp'
                    target='_blank'
                    className='hover:text-blue-500 font-bold'
                  >
                    Privacy
                  </Link>
                </span>{' '}
                Policies
              </div>
            </div>
          </label>
        </div>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          className={styles.signinButton}
        >
          Sign in
        </Button>
      </form>
      <div className='px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 my-5'>
        Or continue with
      </div>
      <div className={styles.webPagesButtonsContainer}>
        <Button className={styles.webPagesButtons} variant='contained'>
          <FacebookIcon fontSize='small' />
        </Button>
        <Button className={styles.webPagesButtons} variant='contained'>
          <TwitterIcon fontSize='small' />
        </Button>
        <Button className={styles.webPagesButtons} variant='contained'>
          <TelegramIcon fontSize='small' />
        </Button>
      </div>
    </div>
  );
};

export default Login;
