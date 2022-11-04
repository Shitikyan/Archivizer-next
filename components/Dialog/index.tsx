import {
  Dialog as DefaultDialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';

export interface DialogProps {
  title: string;
  isOpen: boolean;
  onCancel: () => void;
  onSave: (payload: any) => void;
  children: any;
}

const Dialog = ({
  title,
  isOpen,
  onCancel,
  onSave,
  children,
}: DialogProps) => {
  return (
    <DefaultDialog
      open={isOpen}
      onClose={onCancel}
      PaperProps={{
        style: { borderRadius: 20, height: '100vh' },
      }}
    >
      <div className='relative p-2 h-full flex flex-col'>
        <DialogTitle className='border-b border-solid gray-300 text-center flex-grow'>
          {title}
        </DialogTitle>
        <div
          className='cursor-pointer absolute right-3 top-6'
          onClick={onCancel}
        >
          <Clear />
        </div>
        <DialogContent className='h-5/6 mt-7 mb-3 text-black flex-grow-10'>
          <DialogContentText style={{ color: '#000000' }}>
            {children}
          </DialogContentText>
        </DialogContent>
        <div className='flex justify-end gap-3 flex-grow'>
          <Button
            style={{
              textTransform: 'none',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={onCancel}
            variant='outlined'
          >
            Cancel
          </Button>
          <Button
            style={{ textTransform: 'none' }}
            onClick={onCancel}
            color='primary'
            variant='contained'
          >
            Ok
          </Button>
        </div>
      </div>
    </DefaultDialog>
  );
};

Dialog.whyDidYouRender = true;
export default Dialog;
