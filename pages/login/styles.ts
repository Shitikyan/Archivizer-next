import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
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
  webPagesButton: {
    width: 110,
  },
});
