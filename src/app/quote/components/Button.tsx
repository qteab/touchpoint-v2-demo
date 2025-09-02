import { ButtonHTMLAttributes } from 'react';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};
