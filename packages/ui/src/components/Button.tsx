import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-srd-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-srd-black disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-srd-yellow text-srd-black hover:bg-srd-yellow/90',
        secondary: 'bg-srd-elevated text-white hover:bg-srd-border',
        outline:
          'border border-srd-border bg-transparent text-white hover:border-srd-yellow hover:text-srd-yellow',
        ghost: 'bg-transparent text-white hover:bg-srd-elevated',
        danger: 'bg-red-600 text-white hover:bg-red-500',
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-sm',
        md: 'h-11 rounded-md px-5 text-base',
        lg: 'h-13 rounded-lg px-8 text-lg',
        icon: 'h-11 w-11 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
