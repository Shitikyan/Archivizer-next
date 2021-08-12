import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import { ArchivizerLogo } from '../../shared/ArchivizerLogo';
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
        <ArchivizerLogo className='h-24 w-24 mx-auto' />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400 max-w'>
          Or{' '}
          <Link
            href='default.asp'
            target='_blank'
            className='font-medium text-blue-600 hover:text-blue-500'
          >
            create new account
          </Link>
          {/* <div className={styles.newAccount}>
          <span className='font-medium text-gray-600'>Or</span>
          <span>
            
          </span>
        </div> */}
        </p>
      </div>
      <form
        className={`${styles.form} flex px-10`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          htmlFor='emailAddress'
        >
          Email address
        </label>
        <Controller
          name='emailAddress'
          control={control}
          defaultValue=''
          rules={{
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          }}
          render={({ field }) => (
            <TextField
              id='emailAddress'
              error={!!errors.emailAddress}
              helperText={
                errors.emailAddress?.type == 'required'
                  ? 'This field is required'
                  : errors.emailAddress?.type == 'pattern'
                  ? 'Invalid email address'
                  : null
              }
              size='small'
              variant='outlined'
              {...field}
            />
          )}
        />
        <label
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
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
              error={!!errors.password}
              helperText={
                errors.password?.type == 'required' && 'This field is required'
              }
              variant='outlined'
              size='small'
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
              I confirm that I have read and agree to{' '}
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
          className={clsx('whitespace-nowrap w-full', styles.signinButton)}
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
