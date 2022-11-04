import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { TextField, Button } from '@material-ui/core';
import { Facebook, Twitter, Telegram } from '@material-ui/icons';
import {
  PasswordInput,
  UserIcon,
  Divider,
  Link,
  ErrorTab,
  IconButton,
} from '../../components';
import { getValidationErrorMessage } from '../../utils/forms';
import { emailPattern } from '../../utils/constants';
import { signUp } from '../../services/graphql/auth';
import { useStyles } from './styles';

export interface SignupFormInputs {
  fullName: string;
  emailAddress: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormInputs | null>(null);

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const { data, refetch } = signUp({
    fullName: formData ? formData?.fullName : '',
    email: formData ? formData?.emailAddress : '',
    password: formData ? formData?.password : '',
    queryOptions: { enabled: false, refetchOnWindowFocus: false },
  });

  useEffect(() => {
    if (formData) refetch();
  }, [formData]);

  useEffect(() => {
    // TODO: save token in localstorage
  }, [data]);

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => setFormData(data);

  const errorValues = Object.values(errors);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div>
        <div>
          <div className='flex items-center justify-center'>{<UserIcon />}</div>
          <div className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200'>
            Create an account
          </div>
          <div className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400 max-w'>
            <span className='font-medium text-gray-600'>Or</span>{' '}
            <span>
              <Link
                href='default.asp'
                target='_blank'
                className='hover:text-blue-500 font-medium'
              >
                sign in to your account
              </Link>
            </span>
          </div>
        </div>
        <form
          className='flex flex-col gap-y-6 mt-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              htmlFor='fullName'
            >
              Full name
            </label>
            <Controller
              name='fullName'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: getValidationErrorMessage('Full name', 'required'),
                },
                minLength: {
                  value: 4,
                  message: getValidationErrorMessage(
                    'Full name',
                    'minLength',
                    4
                  ),
                },
              }}
              render={({ field }) => (
                <TextField
                  id='fullName'
                  type='fullName'
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  variant='outlined'
                  fullWidth
                  size='small'
                  {...field}
                />
              )}
            />
          </div>
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
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: getValidationErrorMessage(
                    'Email address',
                    'required'
                  ),
                },
                pattern: {
                  value: emailPattern,
                  message: getValidationErrorMessage(
                    'Email address',
                    'pattern'
                  ),
                },
              }}
              render={({ field }) => (
                <TextField
                  id='emailAddress'
                  error={!!errors.emailAddress}
                  helperText={errors.emailAddress?.message}
                  size='small'
                  fullWidth
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
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: getValidationErrorMessage('Password', 'required'),
                },
                minLength: {
                  value: 4,
                  message: getValidationErrorMessage(
                    'Password',
                    'minLength',
                    4
                  ),
                },
              }}
              render={({ field }) => (
                <PasswordInput
                  id='password'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  useShowIcon
                  fullWidth
                  variant='outlined'
                  size='small'
                  {...field}
                />
              )}
            />
          </div>
          {errorValues.length > 0 && (
            <div>
              <ErrorTab
                header={`There were ${errorValues.length} errors with your submission`}
                content={
                  <ul className='text-sm list-disc mt-2 pl-5'>
                    {errorValues.map((value, index) => (
                      <li key={index} color='error'>{value.message}</li>
                    ))}
                  </ul>
                }
              />
            </div>
          )}
          <Button
            variant='contained'
            type='submit'
            color='primary'
            className={classes.signupButton}
          >
            Sign up
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

Signup.whyDidYouRender = true;
export default Signup;
