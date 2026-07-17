import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'icon'
  children?: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
  const styles: Record<string, string> = {
    primary: 'bg-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-purple-700',
    ghost: 'px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-purple-950/50 hover:text-zinc-200',
    icon: 'h-10 w-10 text-zinc-400 hover:bg-purple-950/50 hover:text-zinc-200',
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
