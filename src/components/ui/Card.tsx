import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children, className = '', ...props }: CardProps) => {
  return (
    <section className={`card ${className}`} {...props}>
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </section>
  );
};
