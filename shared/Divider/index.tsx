import clsx from 'clsx';

interface Props {
  text: string;
  className?: string;
  textClassName?: string;
}

export const Divider = ({ text, className, textClassName }: Props) => {
  return (
    <div className={clsx('relative flex justify-center', className)}>
      <span className={clsx('px-2', textClassName)}>{text}</span>
      <hr className='absolute w-full top-1/2 -z-1' />
    </div>
  );
};
