import React from 'react';
import clsx from 'clsx';
import CancelIcon from '@material-ui/icons/Cancel';
import { useStyles } from './styles';

export interface ErrorTabProps {
  headerClassName?: string;
  contentClassName?: string;
  header?: React.ReactNode;
  content?: React.ReactNode;
}

const ErrorTab = ({
  headerClassName,
  contentClassName,
  header,
  content,
}: ErrorTabProps) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.errorTabContainer, 'flex gap-x-3 p-4 rounded-md')}
    >
      <div>
        <CancelIcon fontSize='small' color='error' />
      </div>
      <div>
        <h3
          className={clsx(
            'text-sm font-medium',
            classes.errorMessageHeader,
            headerClassName
          )}
        >
          {header}
        </h3>
        <div className={contentClassName}>{content}</div>
      </div>
    </div>
  );
};

ErrorTab.whyDidYouRender = true;
export default ErrorTab;
