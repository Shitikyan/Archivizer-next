import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from '@material-ui/core';

export type PasswordInputProps = TextFieldProps & {
  useShowIcon?: boolean;
};

const PasswordInput = ({ useShowIcon, ...rest }: PasswordInputProps) => {
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
};

PasswordInput.whyDidYouRender = true;
export default PasswordInput;
