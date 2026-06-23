import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-display text-xs font-bold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-srd-yellow text-srd-black',
        outline: 'border border-srd-border text-white',
        muted: 'bg-srd-elevated text-srd-muted',
        success: 'bg-green-600/20 text-green-400',
        danger: 'bg-red-600/20 text-red-400',
        live: 'bg-red-600 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
