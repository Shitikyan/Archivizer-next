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
  Dialog
} from '../../components';
import { getValidationErrorMessage } from '../../utils/forms';
import { emailPattern } from '../../utils/constants';
import { login } from '../../services/graphql/auth';
import { useStyles } from './styles';

export interface LoginFormInputs {
  emailAddress: string;
  password: string;
  agreement: boolean;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormInputs | null>(null);
  const [paymentDialogVisible, setPaymentDialogVisible] = useState(false);

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

  const paymentDialogEvent = () => {
    setPaymentDialogVisible(!paymentDialogVisible);
  };

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
                  className='font-medium hover:text-blue-500'
                  onClick={paymentDialogEvent}
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
              <Dialog
                title='Payment Terms and Policy'
                isOpen={paymentDialogVisible}
                onCancel={paymentDialogEvent}
                onSave={paymentDialogEvent}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Why do we use it? It is a long established fact
                that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum
                is that it has a more-or-less normal distribution of letters, as
                opposed to using &apos;Content here, content here&apos;, making it look
                like readable English. Many desktop publishing packages and web
                page editors now use Lorem Ipsum as their default model text,
                and a search for &apos;lorem ipsum&apos; will uncover many web sites still
                in their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and
                the like). Where does it come from? Contrary to popular belief,
                Lorem Ipsum is not simply random text. It has roots in a piece
                of classical Latin literature from 45 BC, making it over 2000
                years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of &quote;de Finibus Bonorum et Malorum&quote;
                (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                This book is a treatise on the theory of ethics, very popular
                during the Renaissance. The first line of Lorem Ipsum, &quote;Lorem
                ipsum dolor sit amet..&quote;, comes from a line in section 1.10.32.
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from &quote;de Finibus Bonorum et Malorum&quote; by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham. Where can I
                get some? There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form, by injected humour, or randomised words which don&apos;t look
                even slightly believable. If you are going to use a passage of
                Lorem Ipsum, you need to be sure there isn&apos;t anything
                embarrassing hidden in the middle of text. All the Lorem Ipsum
                generators on the Internet tend to repeat predefined chunks as
                necessary, making this the first true generator on the Internet.
                It uses a dictionary of over 200 Latin words, combined with a
                handful of model sentence structures, to generate Lorem Ipsum
                which looks reasonable. The generated Lorem Ipsum is therefore
                always free from repetition, injected humour, or
                non-characteristic words etc.
              </Dialog>
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
