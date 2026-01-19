import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`; // Relies on globals.css classes like .btn-primary, .btn-secondary
  const widthClass = fullWidth ? 'w-full' : ''; // w-full might need to be defined in globals.css or use style={{width: '100%'}} if using Tailwind/Utility class not present

  // Mapping simple variants to existing classes in globals.css
  // existing: primary, secondary, success
  // We might need to handle danger/warning if they exist or fallback

  return (
    <button
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      style={fullWidth ? { width: '100%' } : {}}
      {...props}
    >
      {isLoading && <span className="spinner" />}
      {!isLoading && leftIcon && <span className="icon-left">{leftIcon}</span>}
      {children}
    </button>
  );
};
