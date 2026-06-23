import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-md border border-srd-border bg-srd-dark px-3 py-2 text-base text-white',
        'placeholder:text-srd-muted',
        'focus-visible:border-srd-yellow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-srd-yellow',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
