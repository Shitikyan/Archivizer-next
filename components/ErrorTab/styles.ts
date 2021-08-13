import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorTabContainer: {
      backgroundColor: theme.palette.error.light,
    },
    errorMessageHeader: {
      color: theme.palette.error.dark,
    },
    errorMessage: {
      color: theme.palette.error.main,
    },
  })
);
