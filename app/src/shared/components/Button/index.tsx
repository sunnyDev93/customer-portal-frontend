import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  label?: string | React.ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'button';
  color?: 'primary' | 'secondary' | 'muted' | 'danger' | 'outline';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  testId?: string
}

const Button: React.FC<ButtonProps> = ({ testId="button", label, disabled, type = 'button', color = 'primary', onClick, className, icon }) => {
  const buttonColors = {
    primary: 'text-white bg-aptive-900 hover:bg-gray-400 disabled:bg-gray-50 disabled:border-none disabled:text-gray-400',
    secondary: 'text-gray-900 bg-gray-200 hover:bg-gray-100 disabled:bg-gray-50 disabled:border-none disabled:text-gray-400',
    muted: 'hover:text-gray-500 text-gray-700 bg-white border-gray-300 disabled:bg-gray-50 disabled:border-none disabled:text-gray-400',
    outline:
      'hover:text-gray-500 text-gray-700 bg-white border-grass-500 disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-400',
    danger: 'text-white bg-red-500 border-none hover:bg-red-600 disabled:bg-red-200',
  };

  return (
    <button
      data-testid={testId}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        styles.customButton,
        `${buttonColors[color]} pt-2 pb-2 pl-6 pr-6 border text-sm rounded shadow-sm block text-center ${className}`,
        icon && styles.hasIcon
      )}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
