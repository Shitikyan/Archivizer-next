import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { Theme as theme } from '../components';
import '../scripts/wdyr';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default MyApp;
