import clsx from 'clsx';

export interface ArchivizerLogoProps {
  className?: string;
}

const ArchivizerLogo = ({ className }: ArchivizerLogoProps) => {
  return (
    <div
      className={clsx(
        'bg-gradient-to-tr from-blue-600 p-4 rounded-2xl text-white to-blue-400',
        className
      )}
    >
      <svg
        aria-hidden='true'
        x-description='Icon name: Archivizer logo'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        stroke='none'
      >
        <path d='M.4 18c-.1 0-.2 0-.3-.1-.1-.1-.1-.2-.1-.3v-.1L3.9 6.3c.1-.2.1-.3.3-.4.1-.1.3-.2.5-.2h3.8c.2 0 .4.1.5.2.2.1.3.2.3.4l3.9 11.2v.1c0 .1 0 .2-.1.3-.1 0-.2.1-.3.1H9.6c-.2 0-.4 0-.5-.1-.1-.1-.2-.2-.2-.3l-.4-1.2H4.7l-.4 1.2c0 .1-.1.2-.2.3-.1 0-.2.1-.5.1H.4zm5.2-5.1h2l-1-3.3-1 3.3zM15.9 18c-.2 0-.4-.1-.5-.2s-.2-.3-.2-.4L11.8 6.2v-.1c0-.1 0-.2.1-.3.1-.1.2-.1.3-.1h3.3c.2 0 .4.1.5.2.1.1.2.3.2.4l1.7 6.5 1.7-6.5c0-.1.1-.3.2-.4.1-.1.3-.2.5-.2h3.3c.1 0 .2 0 .3.1.1.1.1.2.1.3v.1l-3.3 11.2c0 .1-.1.3-.2.4-.1.1-.3.2-.5.2h-4.1z'></path>
      </svg>
    </div>
  );
};

ArchivizerLogo.whyDidYouRender = true;

export default ArchivizerLogo;
