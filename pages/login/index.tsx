import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { TextField, Button, Checkbox } from '@material-ui/core';
import { Twitter, Facebook, Telegram } from '@material-ui/icons';
import {
  ArchivizerLogo,
  PasswordInput,
  IconButton,
  Divider,
  Link,
} from '../../components';
import { getValidationErrorMessage } from '../../utils/forms';
import { emailPattern } from '../../utils/constants';
import { login } from '../../services/auth';
import { useStyles } from './styles';

export interface LoginFormInputs {
  emailAddress: string;
  password: string;
  agreement: boolean;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormInputs | null>(null);

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();

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

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => setFormData(data);

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
                required: {
                  value: true,
                  message: getValidationErrorMessage(
                    'email address',
                    'required'
                  ),
                },
                pattern: {
                  value: emailPattern,
                  message: getValidationErrorMessage(
                    'email address',
                    'pattern'
                  ),
                },
              }}
              render={({ field }) => (
                <TextField
                  id='emailAddress'
                  error={!!errors.emailAddress}
                  helperText={errors.emailAddress?.message}
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
              rules={{
                required: {
                  value: true,
                  message: getValidationErrorMessage('password', 'required'),
                },
              }}
              render={({ field }) => (
                <PasswordInput
                  id='password'
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
          <IconButton
            className={clsx('flex-grow', classes.webPagesButton)}
            icon={<Facebook fontSize='small' color='secondary' />}
          />
          <IconButton
            className={clsx('flex-grow', classes.webPagesButton)}
            icon={<Twitter fontSize='small' color='secondary' />}
          />
          <IconButton
            className={clsx('flex-grow', classes.webPagesButton)}
            icon={<Telegram fontSize='small' color='secondary' />}
          />
        </div>
      </div>
    </div>
  );
};

Login.whyDidYouRender = true;

export default Login;
