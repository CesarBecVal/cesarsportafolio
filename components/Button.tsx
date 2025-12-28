import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  external?: boolean;
  download?: boolean | string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  href, 
  external,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-accent backdrop-blur-sm disabled:opacity-50";
  
  const variants = {
    primary: "bg-accent/10 text-accent border border-accent/50 hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(0,184,217,0.4)]",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white",
    outline: "border border-slate-600 text-slate-400 hover:border-slate-300 hover:text-slate-200"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    // Cast props to any to avoid TypeScript errors when spreading button props on anchor
    const { type, ...anchorProps } = props as any;
    return (
      <a 
        href={href} 
        target={external ? "_blank" : undefined} 
        rel={external ? "noopener noreferrer" : undefined}
        className={combinedClasses}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;