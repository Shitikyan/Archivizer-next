import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps } from '@material-ui/core';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

const IconButton = ({ icon, ...rest }: IconButtonProps) => {
  return (
    <Button
      {...rest}
      className={clsx('rounded-md', rest.className)}
      variant='outlined'
      size='large'
      disableElevation
    >
      {icon}
    </Button>
  );
};

IconButton.whyDidYouRender = true;

export default IconButton;
