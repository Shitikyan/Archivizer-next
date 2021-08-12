import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from '@material-ui/core';

type Props = TextFieldProps & {
  useShowIcon?: boolean;
};

export const PasswordInput = React.forwardRef(
  ({ useShowIcon, ...rest }: Props, ref: any) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        {...rest}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: useShowIcon ? (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    );
  }
);
