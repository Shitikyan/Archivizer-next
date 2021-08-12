import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryClientProvider, QueryClient } from 'react-query';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../shared/Theme';
import '../scripts/wdyr';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
