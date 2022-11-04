import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#315fd7',
    },
    secondary: {
      main: '#71717a',
    },
    error: {
      main: '#b91c1c',
      dark: '#991b1b',
      light: '#fef2f2',
    },
    background: {
      default: '#fff',
      paper: '#fff'
    },
  },
});

export default theme;
