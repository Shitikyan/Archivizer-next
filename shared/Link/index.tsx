import React from 'react';
import { Link as DefaultLink, LinkProps } from '@material-ui/core';

interface Props extends LinkProps {
  component?: React.ElementType<any>;
}

export const Link = ({
  component = 'a',
  underline = 'none',
  ...rest
}: Props) => {
  return <DefaultLink {...rest} component={component} underline={underline} />;
};
