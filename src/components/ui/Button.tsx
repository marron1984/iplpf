'use client';

import { cn } from '@/lib/utils';
import { forwardRef, ButtonHTMLAttributes, useRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'relative inline-flex items-center justify-center',
      'font-medium tracking-tight',
      'transition-colors duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-40 disabled:cursor-not-allowed'
    );

    const variants = {
      primary: cn(
        'bg-stone-900 text-white',
        'hover:bg-stone-800',
        'focus-visible:ring-stone-900'
      ),
      secondary: cn(
        'bg-stone-100 text-stone-900',
        'hover:bg-stone-200',
        'focus-visible:ring-stone-400'
      ),
      ghost: cn(
        'bg-transparent text-stone-600',
        'hover:bg-stone-100 hover:text-stone-900',
        'focus-visible:ring-stone-400'
      ),
      text: cn(
        'bg-transparent text-indigo-600',
        'hover:text-indigo-700',
        'focus-visible:ring-indigo-500'
      ),
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-lg',
      md: 'h-11 px-6 text-[15px] rounded-xl',
      lg: 'h-14 px-8 text-base rounded-2xl',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <motion.span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <span className="opacity-70">処理中</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
