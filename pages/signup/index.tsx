import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { Link } from '../../shared/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { PasswordInput } from '../../shared/Form/PasswordInput';
import { UserIcon } from '../../shared/Icons/UserIcon';
import { Divider } from '../../shared/Divider';
import { signUp } from '../../services/auth';

import styles from './styles.module.css';

interface ISignupFormInputs {
  fullName: string;
  emailAddress: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<ISignupFormInputs | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignupFormInputs>();

  const { data, refetch } = signUp({
    fullName: formData ? formData?.fullName : '',
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

  const onSubmit: SubmitHandler<ISignupFormInputs> = (data) =>
    setFormData(data);

  const {
    fullName: nameError,
    emailAddress: emailError,
    password: passwordError,
  } = errors;

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
                className='hover:text-blue-500 font-bold'
              >
                sign in to your account
              </Link>
            </span>
          </div>
        </div>
        <form
          className={`${styles.form} flex flex-col`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor='fullName'
          >
            Full name
          </label>
          <Controller
            name='fullName'
            control={control}
            defaultValue=''
            rules={{ required: true, minLength: 4 }}
            render={({ field }) => (
              <TextField
                id='fullName'
                type='fullName'
                error={!!errors.fullName}
                helperText={
                  errors.fullName?.type == 'required' ? (
                    <div className='text-red-600'>This field is required</div>
                  ) : errors.fullName?.type == 'minLength' ? (
                    <div className='text-red-600'>
                      Your Full name must be more than 4 characters.
                    </div>
                  ) : null
                }
                variant='outlined'
                size='small'
                {...field}
              />
            )}
          />
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
                  errors.emailAddress?.type == 'required' ? (
                    <div className='text-red-600'>This field is required</div>
                  ) : errors.emailAddress?.type == 'pattern' ? (
                    <div className='text-red-600'>Invalid email address</div>
                  ) : errors.emailAddress?.type == 'minLength' ? (
                    <div className='text-red-600'>
                      Your email must be more than 4 characters.
                    </div>
                  ) : null
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
            rules={{ required: true, minLength: 4 }}
            render={({ field }) => (
              <PasswordInput
                id='password'
                error={!!errors.password}
                helperText={
                  errors.password?.type == 'required'
                    ? 'This field is required'
                    : errors.password?.type == 'minLength'
                    ? 'Your password must be more than 4 characters.'
                    : null
                }
                useShowIcon
                variant='outlined'
                size='small'
                {...field}
              />
            )}
          />
          {emailError && nameError && passwordError && (
            <div className={styles.submissionError}>
              <div className={`${styles.submissionErrorHeader} flex`}>
                <div>
                  <HighlightOffIcon fontSize='small' />
                </div>
                <div>
                  <div>There were 2 errors with your submission</div>
                  <ul className={styles.listedHeader}>
                    <li>Your password must be at least 8 characters</li>
                    <li>
                      Your password must include at least one pro wrestling
                      finishing move
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <Button
            variant='contained'
            type='submit'
            color='primary'
            className={styles.signupButton}
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

export default Signup;
