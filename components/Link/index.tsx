import React from 'react';
import { Link as DefaultLink, LinkProps as DefaultLinkProps } from '@material-ui/core';

export interface LinkProps extends DefaultLinkProps {
  component?: React.ElementType<any>;
}

const Link = ({
  component = 'a',
  underline = 'none',
  ...rest
}: LinkProps) => <DefaultLink {...rest} component={component} underline={underline} />;

Link.whyDidYouRender = true;
export default Link;
