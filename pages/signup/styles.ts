import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signupButton: {
      textTransform: 'none',
    },
    webPagesButton: {
      width: 110,
    },
  })
);
