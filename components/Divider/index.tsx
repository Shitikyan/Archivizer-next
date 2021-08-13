import clsx from 'clsx';

export interface DividerProps {
  text: string;
  className?: string;
  textClassName?: string;
}

const Divider = ({ text, className, textClassName }: DividerProps) => {
  return (
    <div className={clsx('relative flex justify-center', className)}>
      <span className={clsx('px-2', textClassName)}>{text}</span>
      <hr className='absolute w-full top-1/2 -z-1' />
    </div>
  );
};

Divider.whyDidYouRender = true;
export default Divider;
