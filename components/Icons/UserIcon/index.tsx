import clsx from 'clsx';

export interface UserIconProps {
  className?: string;
}

const UserIcon = ({ className }: UserIconProps) => {
  return (
    <div
      className={clsx(
        'bg-gray-100 dark:bg-gray-800 text-blue-600 h-24 mx-auto p-2 rounded-2xl w-24',
        className
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        ></path>
      </svg>
    </div>
  );
};

UserIcon.whyDidYouRender = true;
export default UserIcon;
