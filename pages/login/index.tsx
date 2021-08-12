import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import { ArchivizerLogo } from '../../shared/ArchivizerLogo';
import { PasswordInput } from '../../shared/Form/PasswordInput';
import { Divider } from '../../shared/Divider';
import { login } from '../../services/auth';
import { Link } from '../../shared/Link';

import styles from './styles.module.css';

interface ILoginFormInputs {
  emailAddress: string;
  password: string;
  agreement: boolean;
}

const useStyles = makeStyles({
  checkboxRoot: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  signInButtonRoot: {
    padding: '8px 16px',
    textTransform: 'none',
    fontFamily: 'Rubik',
  },
});

const Login = () => {
  const [formData, setFormData] = useState<ILoginFormInputs | null>(null);

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormInputs>();

  const { data, refetch } = login({
    email: formData ? formData?.emailAddress : '',
    password: formData ? formData?.password : '',
    queryOptions: { enabled: false, refetchOnWindowFocus: false },
  });

  useEffect(() => {
    if (formData) {
      refetch();
    }
  }, [formData]);

  useEffect(() => {
    // TODO: save token in localstorage
  }, [data]);

  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => setFormData(data);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='px-10'>
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
          </p>
        </div>
        <form
          className='mt-10 flex flex-col gap-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              htmlFor='emailAddress'
            >
              Email address
            </label>
            <Controller
              name='emailAddress'
              control={control}
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
                  fullWidth
                  size='small'
                  variant='outlined'
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <label
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              htmlFor='password'
            >
              Password
            </label>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PasswordInput
                  id='password'
                  error={!!errors.password}
                  helperText={
                    errors.password?.type == 'required' &&
                    'This field is required'
                  }
                  fullWidth
                  useShowIcon
                  variant='outlined'
                  size='small'
                  {...field}
                />
              )}
            />
          </div>
          <Link
            href='default.asp'
            target='_blank'
            className='hover:text-blue-500 font-medium text-right text-sm'
          >
            Forgot your password?
          </Link>
          <div className='flex'>
            <Controller
              name='agreement'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Checkbox
                  id='agreement'
                  color='primary'
                  className={classes.checkboxRoot}
                  {...field}
                />
              )}
            />
            <label
              htmlFor='agreement'
              className='ml-2 block text-sm text-gray-900 dark:text-gray-100'
            >
              <div className='my-22'>
                I confirm that I have read and agree to{' '}
                <Link
                  href='default.asp'
                  target='_blank'
                  className='font-medium hover:text-blue-500'
                >
                  Payment
                </Link>
                ,
                <div>
                  <Link
                    href='default.asp'
                    target='_blank'
                    className='font-medium hover:text-blue-500'
                  >
                    Refund
                  </Link>{' '}
                  and{' '}
                  <span>
                    <Link
                      href='default.asp'
                      target='_blank'
                      className='hover:text-blue-500 font-medium'
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
            className={clsx(
              'whitespace-nowrap w-full',
              classes.signInButtonRoot
            )}
          >
            Sign in
          </Button>
        </form>
        <Divider
          text='Or continue with'
          className='my-6'
          textClassName='text-sm bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400'
        />
        <div className='flex gap-x-2.5 my-1'>
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
    </div>
  );
};

Login.whyDidYouRender = true;

export default Login;
